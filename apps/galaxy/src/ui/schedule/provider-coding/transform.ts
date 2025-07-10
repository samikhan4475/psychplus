import { parseDate } from '@internationalized/date'
import { NULL_CONTENT } from '@/constants'
import { UserSetting } from '@/types'
import { AppointmentParams, FilterValue } from '../types'
import {
  getCalendarDateFromUtc,
  getCalendarDateLabel,
  getDateString,
} from '../utils'
import { ProviderCodingSchema } from './provider-coding-view-schema'

const numericFields = [
  'age',
  'lengthOfStayMin',
  'lengthOfStayMax',
  'copayDueMin',
  'copayDueMax',
  'coInsuranceDueMin',
  'coInsuranceDueMax',
  'balanceDueMin',
  'balanceDueMax',
]

const multiselectFields = ['serviceIds', 'appointmentStatuses']

const startingDateFields = [
  'startingDate',
  'dateOfAdmissionStart',
  'lastCoverageDateStart',
]

const endingDateFields = [
  'endingDate',
  'dateOfAdmissionEnd',
  'lastCoverageDateEnd',
]

const singleSelectArrayFields = [
  'locationIds',
  'providerTypes',
  'unitIds',
  'roomIds',
  'groupIds',
  'primaryInsuranceNames',
  'secondaryInsuranceNames',
  'visitTypes',
  'visitSequences',
  'visitMediums',
  'patientInsuranceVerificationStatuses',
  'noteSignedStatuses',
  'legalStatuses',
  'facilityAdmissionIds',
]

const dateOfBirthField = 'dateOfBirth'

const transformSettingToParams = (map: Map<string, UserSetting>) => {
  const params: Record<string, string | number | string[] | number[]> = {}
  map.forEach((setting, key) => {
    if (setting.content === NULL_CONTENT) return
    params[key] = getParamValue(key, setting.content)
  })
  return params
}

const getParamValue = (key: string, val: string) => {
  if (numericFields.includes(key)) {
    return Number(val)
  }
  if (
    multiselectFields.includes(key) ||
    singleSelectArrayFields.includes(key)
  ) {
    return val.split('|')
  }
  return val
}

const transformSettingContent = (key: string, value: string) => {
  if (startingDateFields.includes(key)) {
    return getCalendarDateFromUtc(value)!
  }
  if (endingDateFields.includes(key)) {
    return getCalendarDateFromUtc(value)!.subtract({ days: 1 })
  }
  if (dateOfBirthField === key) {
    return parseDate(value)
  }
  if (numericFields.includes(key)) {
    return Number(value)
  }
  if (singleSelectArrayFields.includes(key)) {
    return value
  }
  if (multiselectFields.includes(key)) {
    return value.split('|')
  }
  return value
}

const transformSettingToFilterValues = (
  settingMap: Map<string, UserSetting>,
) => {
  const params: Record<string, FilterValue> = {}
  settingMap.forEach((setting, key) => {
    if (setting.content === NULL_CONTENT) return
    params[key] = transformSettingContent(key, setting.content)
  })
  return params
}

const transformFilterValues = (values: ProviderCodingSchema) => {
  return {
    ...values,
    startingDate: getDateString(values.startingDate),
    endingDate: getDateString(values.endingDate?.add({ days: 1 })),
    dateOfBirth: getCalendarDateLabel(values.dateOfBirth),
    dateOfAdmissionStart: getDateString(values.dateOfAdmissionStart),
    dateOfAdmissionEnd: getDateString(
      values.dateOfAdmissionEnd?.add({ days: 1 }),
    ),
    lastCoverageDateStart: getDateString(values.lastCoverageDateStart),
    lastCoverageDateEnd: getDateString(
      values.lastCoverageDateEnd?.add({ days: 1 }),
    ),
    locationIds: values.locationIds ? [values.locationIds] : [],
    facilityAdmissionIds: values.facilityAdmissionIds
      ? [values.facilityAdmissionIds]
      : [],
    unitIds: values.unitIds ? [values.unitIds] : [],
    roomIds: values.roomIds ? [values.roomIds] : [],
    groupIds: values.groupIds ? [values.groupIds] : [],
    patientInsuranceVerificationStatuses:
      values.patientInsuranceVerificationStatuses
        ? [values.patientInsuranceVerificationStatuses]
        : [],
    visitMediums: values.visitMediums ? [values.visitMediums] : [],
    primaryInsuranceNames: values.primaryInsuranceNames
      ? [values.primaryInsuranceNames]
      : [],
    secondaryInsuranceNames: values.secondaryInsuranceNames
      ? [values.secondaryInsuranceNames]
      : [],
    visitTypes: values.visitTypes ? [values.visitTypes] : [],
    visitSequences: values.visitSequences ? [values.visitSequences] : [],
    noteSignedStatuses: values.noteSignedStatuses
      ? [values.noteSignedStatuses]
      : [],
    legalStatuses: values.legalStatuses ? [values.legalStatuses] : [],
    providerTypes: values.providerTypes ? [values.providerTypes] : [],
  }
}

const transformParamsToFilterValues = (
  params: AppointmentParams,
): ProviderCodingSchema => {
  return {
    ...params,
    startingDate: getCalendarDateFromUtc(params.startingDate),
    endingDate: getCalendarDateFromUtc(params.endingDate)?.subtract({
      days: 1,
    }),
    dateOfBirth: params.dateOfBirth ? parseDate(params.dateOfBirth) : undefined,
    dateOfAdmissionStart: getCalendarDateFromUtc(params.dateOfAdmissionStart),
    dateOfAdmissionEnd: getCalendarDateFromUtc(
      params.dateOfAdmissionEnd,
    )?.subtract({ days: 1 }),
    lastCoverageDateStart: getCalendarDateFromUtc(params.lastCoverageDateStart),
    lastCoverageDateEnd: getCalendarDateFromUtc(
      params.lastCoverageDateEnd,
    )?.subtract({ days: 1 }),
    locationIds: params.locationIds?.[0] ?? '',
    facilityAdmissionIds: params.facilityAdmissionIds?.[0] ?? '',
    servicesOffered: params.servicesOffered ?? [],
    appointmentStatuses: params.appointmentStatuses ?? [],
    legalStatuses: params.legalStatuses?.[0] ?? '',
    unitIds: params.unitIds?.[0] ?? '',
    roomIds: params.roomIds?.[0] ?? '',
    groupIds: params.groupIds?.[0] ?? '',
    patientInsuranceVerificationStatuses:
      params.patientInsuranceVerificationStatuses?.[0] ?? '',
    visitMediums: params.visitMediums?.[0] ?? '',
    primaryInsuranceNames: params.primaryInsuranceNames?.[0] ?? '',
    secondaryInsuranceNames: params.secondaryInsuranceNames?.[0] ?? '',
    visitTypes: params.visitTypes?.[0] ?? '',
    visitSequences: params.visitSequences?.[0] ?? '',
    noteSignedStatuses: params.noteSignedStatuses?.[0] ?? '',
    providerTypes: params.providerTypes?.[0] ?? '',
  }
}

export {
  transformSettingToParams,
  transformFilterValues,
  transformParamsToFilterValues,
  transformSettingToFilterValues,
}
