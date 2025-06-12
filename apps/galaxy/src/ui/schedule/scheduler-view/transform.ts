import {
  CalendarDate,
  getLocalTimeZone,
  parseAbsolute,
  toCalendarDate,
} from '@internationalized/date'
import { NULL_CONTENT } from '@/constants'
import { UserSetting } from '@/types'
import { AvailableSlotsParams, FilterValue } from '../types'
import { getCalendarDateFromUtc, getDateString } from '../utils'
import { SchemaType } from './schema'
import { AppointmentAvailability } from './types'
import { getMaxDaysOutToLookFor } from './utils'

const dateFields = ['startingDate']

const multiselectFields = [
  'stateIds',
  'locationIds',
  'serviceIds',
  'providerTypes',
  'staffIds',
]

const transformSettingToFilterValues = (
  settingMap: Map<string, UserSetting>,
) => {
  const params: Record<string, FilterValue> = {}
  settingMap.forEach((value, key) => {
    if (value.content === NULL_CONTENT) return
    params[key] = transformSettingContent(key, value.content)
  })
  const endingDate = getEndingDate(params)
  if (endingDate) {
    params.endingDate = endingDate
  }
  return params
}

const getEndingDate = (
  params: Record<string, FilterValue>,
): CalendarDate | undefined => {
  const { startingDate, maxDaysOutToLook } = params

  if (startingDate instanceof CalendarDate && maxDaysOutToLook) {
    return startingDate.add({ days: Number(maxDaysOutToLook) - 1 })
  }
}

const transformSettingContent = (key: string, value: string) => {
  if (dateFields.includes(key)) {
    return toCalendarDate(parseAbsolute(value, getLocalTimeZone()))
  }
  if (multiselectFields.includes(key)) {
    return value.split('|')
  }
  return value
}

const getParamValue = (key: string, val: string) => {
  if (key === 'staffIds') {
    return val.split('|').map((v) => Number(v))
  }
  if (multiselectFields.includes(key)) {
    return val.split('|')
  }
  if (key === 'maxDaysOutToLook') {
    return Number(val)
  }
  return val
}

const transformSettingToParams = (map: Map<string, UserSetting>) => {
  const params: Record<string, string | string[] | number | number[]> = {}
  map.forEach((setting, key) => {
    if (setting.content === NULL_CONTENT) return
    params[key] = getParamValue(key, setting.content)
  })
  return params
}

const transformFilterValues = (values: SchemaType) => {
  return {
    ...values,
    startingDate: getDateString(values.startingDate),
    staffIds: values.staffIds ? values.staffIds.map((id) => Number(id)) : [],
    maxDaysOutToLook: getMaxDaysOutToLookFor(
      values.startingDate,
      values.endingDate,
    ),
  }
}

const transformParamsToFilterValues = (
  params: AvailableSlotsParams,
): SchemaType => {
  const daysOffset = params.maxDaysOutToLook
  const endingDate = daysOffset
    ? getCalendarDateFromUtc(params.startingDate)?.add({ days: daysOffset - 1 })
    : undefined
  return {
    ...params,
    startingDate: getCalendarDateFromUtc(params.startingDate),
    staffIds: params.staffIds ? params.staffIds.map((id) => String(id)) : [],
    endingDate,
    stateIds: params.stateIds ? params.stateIds : [],
    locationIds: params.locationIds ? params.locationIds : [],
    serviceIds: params.serviceIds ? params.serviceIds : [],
    providerTypes: params.providerTypes ? params.providerTypes : [],
    visitTypeCode: params.visitTypeCode ? params.visitTypeCode : [],
  }
}

const mergeRecords = (
  slots: AppointmentAvailability[],
): AppointmentAvailability[] => {
  const seenRecords: { [key: string]: AppointmentAvailability } = {}
  slots.forEach((availability) => {
    const key = `${availability.specialist.id}-${availability.clinic.id}`
    if (seenRecords[key]) {
      seenRecords[key] = {
        ...seenRecords[key],
        allSlotsByDay: {
          ...seenRecords[key].allSlotsByDay,
          ...availability.allSlotsByDay,
        },
      }
    } else {
      seenRecords[key] = availability
    }
  })
  return Object.values(seenRecords)
}

export {
  transformSettingContent,
  transformSettingToParams,
  transformSettingToFilterValues,
  transformFilterValues,
  transformParamsToFilterValues,
  mergeRecords,
}
