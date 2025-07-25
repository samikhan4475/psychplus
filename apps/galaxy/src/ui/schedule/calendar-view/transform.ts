import {
  getLocalTimeZone,
  parseAbsolute,
  toCalendarDate,
} from '@internationalized/date'
import { NULL_CONTENT } from '@/constants'
import { UserSetting } from '@/types'
import {
  AppointmentParams,
  CalenderViewSchemaType,
  FilterValue,
} from '../types'

const dateFields = ['startingDate', 'endingDate']

const multiselectFields = [
  'stateIds',
  'locationIds',
  'serviceIds',
  'groupIds',
  'unitIds',
  'visitTypes',
  'servicesOffered',
]

const transformSettingToFilterValues = (
  settingMap: Map<string, UserSetting>,
) => {
  const params: Record<string, FilterValue> = {}
  settingMap.forEach((value, key) => {
    if (value.content === NULL_CONTENT) return
    params[key] = transformSettingContent(key, value.content)
  })
  return params
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
  if (multiselectFields.includes(key)) {
    return val.split('|')
  }
  if (key === 'providerIds') {
    return [Number(val)]
  }
  if (key === 'visitMediums' || key === 'providerTypes') {
    return [val]
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

const transformFilterValues = (data: CalenderViewSchemaType) => {
  return {
    ...data,
    providerIds: data.providerIds ? [Number(data.providerIds)] : [],
    visitMediums: data.visitMediums ? [data.visitMediums] : [],
    providerTypes: data.providerTypes ? [data.providerTypes] : [],
  }
}

const transformParamsToFilterValues = (
  params: AppointmentParams,
): CalenderViewSchemaType => {
  return {
    ...params,
    providerIds: params.providerIds ? String(params.providerIds[0]) : '',
    stateIds: params.stateIds ?? [],
    locationIds: params.locationIds ?? [],
    serviceIds: params.serviceIds ?? [],
    visitMediums: params.visitMediums?.[0] ?? '',
    providerTypes: params.providerTypes?.[0] ?? '',
  }
}

export {
  transformSettingContent,
  transformSettingToParams,
  transformSettingToFilterValues,
  transformParamsToFilterValues,
  transformFilterValues,
}
