import { parseDate } from '@internationalized/date'
import { NULL_CONTENT } from '@/constants'
import { UserSetting } from '@/types'
import { BookedAppointmentsSchemaType } from '../schema'
import { AppointmentParams, FilterValue } from '../types'
import {
  getCalendarDateFromUtc,
  getCalendarDateLabel,
  getDateString,
} from '../utils'

const numericFields = [
  'age',
  'lengthOfStayMin',
  'lengthOfStayMax',
  'copayDueMax',
  'copayDueMin',
  'copayPaid',
  'coInsuranceDueMin',
  'coInsuranceDueMax',
  'coInsurancePaid',
  'balanceDueMin',
  'balanceDueMax',
  'balancePaid',
]

const multiselectFields = [
  'serviceIds',
  'locationIds',
  'appointmentStatuses',
  'patientStatuses',
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
]

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

const dateOfBirthField = 'dateOfBirth'

const getParamValue = (key: string, val: string) => {
  if (numericFields.includes(key)) {
    return Number(val)
  }
  if (multiselectFields.includes(key)) {
    return val.split('|')
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
  if (multiselectFields.includes(key)) {
    return value.split('|')
  }
  return value
}

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

const transformFilterValues = (values: BookedAppointmentsSchemaType) => {
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
    providerIds: [],
    bookedAppointmentTime: '',
  }
}

const transformParamsToFilterValues = (
  params: AppointmentParams,
): BookedAppointmentsSchemaType => {
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
    )?.subtract({
      days: 1,
    }),
    lastCoverageDateStart: getCalendarDateFromUtc(params.lastCoverageDateStart),
    lastCoverageDateEnd: getCalendarDateFromUtc(
      params.lastCoverageDateEnd,
    )?.subtract({
      days: 1,
    }),
    patientStatuses: params.patientStatuses ?? [],
    roomIds: params.roomIds ?? [],
    unitIds: params.unitIds ?? [],
    groupIds: params.groupIds ?? [],
    locationIds: params.locationIds ?? [],
    servicesOffered: params.servicesOffered ?? [],
    appointmentStatuses: params.appointmentStatuses ?? [],
    providerTypes: params.providerTypes ?? [],
    primaryInsuranceNames: params.primaryInsuranceNames ?? [],
    secondaryInsuranceNames: params.secondaryInsuranceNames ?? [],
    visitTypes: params.visitTypes ?? [],
    visitSequences: params.visitSequences ?? [],
    visitMediums: params.visitMediums ?? [],
    patientInsuranceVerificationStatuses:
      params.patientInsuranceVerificationStatuses ?? [],
    legalStatuses: params.legalStatuses ?? [],
    noteSignedStatuses: params.noteSignedStatuses ?? [],
    stateIds: [],
    providerIds: [],
    bookedAppointmentTime: undefined,
  }
}

export {
  transformSettingToParams,
  transformParamsToFilterValues,
  transformFilterValues,
  transformSettingToFilterValues,
}
