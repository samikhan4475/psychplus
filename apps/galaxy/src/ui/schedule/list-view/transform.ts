import { parseDate, parseTime } from '@internationalized/date'
import { NULL_CONTENT } from '@/constants'
import { UserSetting } from '@/types'
import { BookedAppointmentsSchemaType } from '../schema'
import { AppointmentParams, FilterValue } from '../types'
import {
  getCalendarDateFromUtc,
  getCalendarDateLabel,
  getDateString,
  getLocalTime,
} from '../utils'

const dateFields = [
  'startingDate',
  'endingDate',
  'dateOfAdmissionStart',
  'dateOfAdmissionEnd',
  'lastCoverageDateStart',
  'lastCoverageDateEnd',
]
const dateOfBirthField = 'dateOfBirth'
const timeFields = ['bookedAppointmentTime']
const numericFields = [
  'lengthOfStayMin',
  'lengthOfStayMax',
  'copayDueMin',
  'copayDueMax',
  'copayPaid',
  'coInsuranceDueMin',
  'coInsuranceDueMax',
  'coInsurancePaid',
  'balanceDueMin',
  'balanceDueMax',
  'balancePaid',
]

const multiselectFields = [
  'age',
  'stateIds',
  'locationIds',
  'servicesOffered',
  'appointmentStatuses',
  'patientStatuses',
  'providerTypes',
  'providerIds',
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

const transformSettingContent = (key: string, value: string) => {
  if (dateFields.includes(key)) {
    const calendarDate = getCalendarDateFromUtc(value)!
    if (key === 'endingDate') {
      return calendarDate.subtract({ days: 1 })
    }
    return calendarDate
  }
  if (dateOfBirthField === key) {
    return parseDate(value)
  }
  if (timeFields.includes(key)) {
    return parseTime(value)
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

const getParamValue = (key: string, val: string) => {
  if (numericFields.includes(key)) {
    return Number(val)
  }
  if (key === 'providerIds') {
    return val.split('|').map((v) => Number(v))
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

const transformFilterValues = (values: BookedAppointmentsSchemaType) => {
  return {
    ...values,
    startingDate: getDateString(values.startingDate),
    endingDate: getDateString(values.endingDate?.add({ days: 1 })),
    dateOfBirth: getCalendarDateLabel(values.dateOfBirth),
    dateOfAdmissionStart: getDateString(values.dateOfAdmissionStart),
    dateOfAdmissionEnd: getDateString(
      values.dateOfAdmissionStart?.add({ days: 1 }),
    ),
    lastCoverageDateStart: getDateString(values.lastCoverageDateStart),
    lastCoverageDateEnd: getDateString(values.lastCoverageDateStart),
    patientStatuses: values.patientStatuses ?? [],
    bookedAppointmentTime: getLocalTime(values.bookedAppointmentTime),
    providerIds: values.providerIds?.length
      ? values.providerIds.map((id) => Number(id))
      : [],
    copayDueMax: values.copayDueMin,
    coInsuranceDueMax: values.coInsuranceDueMin,
    balanceDueMax: values.balanceDueMin,
    lengthOfStayMax: values.lengthOfStayMin,
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
    dateOfAdmissionEnd: undefined,
    lastCoverageDateStart: getCalendarDateFromUtc(params.lastCoverageDateStart),
    lastCoverageDateEnd: undefined,
    patientStatuses: params.patientStatuses ?? [],
    bookedAppointmentTime: params.bookedAppointmentTime
      ? parseTime(params.bookedAppointmentTime)
      : undefined,
    providerIds: params.providerIds
      ? params.providerIds.map((id) => String(id))
      : [],
    stateIds: params.stateIds ?? [],
    roomIds: params.roomIds ?? [],
    locationIds: params.locationIds ?? [],
    servicesOffered: params.servicesOffered ?? [],
    appointmentStatuses: params.appointmentStatuses ?? [],
    providerTypes: params.providerTypes ?? [],
    unitIds: params.unitIds ?? [],
    groupIds: params.groupIds ?? [],
    primaryInsuranceNames: params.primaryInsuranceNames ?? [],
    secondaryInsuranceNames: params.secondaryInsuranceNames ?? [],
    visitTypes: params.visitTypes ?? [],
    visitSequences: params.visitSequences ?? [],
    visitMediums: params.visitMediums ?? [],
    patientInsuranceVerificationStatuses:
      params.patientInsuranceVerificationStatuses ?? [],
    legalStatuses: params.legalStatuses ?? [],
    noteSignedStatuses: params.noteSignedStatuses ?? [],
    age: params.age ?? [],
  }
}

export {
  transformSettingContent,
  transformSettingToFilterValues,
  transformSettingToParams,
  transformFilterValues,
  transformParamsToFilterValues,
}
