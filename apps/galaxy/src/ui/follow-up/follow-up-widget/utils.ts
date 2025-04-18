import {
  getLocalTimeZone,
  parseAbsolute,
  parseAbsoluteToLocal,
  toCalendarDateTime,
} from '@internationalized/date'
import {
  Appointment,
  BookVisitPayload,
  VisitSequenceTypes,
  VisitTypes,
} from '@/types'
import { isHospitalCareVisit, VisitTypeEnum } from '@/utils'
import { NEXT_OPTIONS } from './constants'

const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj)
      .flatMap(([key, value]) => {
        if (
          Array.isArray(value) &&
          (value.length === 0 || value.every((v) => v === ''))
        ) {
          return []
        }
        return [[key, value]]
      })
      .filter(([_, value]) => value !== null && value !== ''),
  )
}

const sanitizeFormData = <T extends object>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== '' && value !== null,
    ),
  ) as T

const getEndDate = (selectedValue: string) => {
  const today = new Date()
  const endDate = new Date(today)

  const valueMap: Record<string, number> = {
    day: 1,
    days: 1,
    week: 7,
    weeks: 7,
  }

  const selectedOption = NEXT_OPTIONS.find(
    (option) => option.value === selectedValue,
  )

  if (selectedOption) {
    let amountStr = ''
    let unit = ''

    for (const char of selectedValue) {
      if (!isNaN(Number(char))) {
        amountStr += char
      } else {
        unit += char
      }
    }

    const amount = Number(amountStr)

    if (amount && unit in valueMap) {
      const daysToAdd = amount * valueMap[unit as keyof typeof valueMap]
      endDate.setDate(today.getDate() + daysToAdd)
    }
  }

  return endDate
}

const getOffsetStartDate = (next: string, date: string) => {
  const [offset, type] = next.split(' ')
  const parsedDate = parseAbsoluteToLocal(date)

  if (type === 'week') {
    const offsetDate = parsedDate.add({ weeks: Number(offset) })
    return offsetDate.toDate().toISOString()
  }
  if (type === 'day') {
    const offsetDate = parsedDate.add({ days: Number(offset) })
    return offsetDate.toDate().toISOString()
  }
  return parsedDate.toDate().toISOString()
}

const getEncounterType = (appointment: Appointment) => {
  const followEncounterTypes = [
    VisitTypes.Outpatient,
    VisitTypes.EdVisit,
    VisitTypes.TransitionalCare,
  ]

  if (followEncounterTypes.includes(appointment.visitTypeCode as VisitTypes)) {
    return VisitTypes.Outpatient
  } else {
    return appointment.visitTypeCode
  }
}
const getDurationMinutes = (
  appointment: Appointment,
  defaultDuration: string,
): number => {
  switch (appointment.visitTypeCode) {
    case VisitTypes.Tms:
    case VisitTypes.Spravato:
    case VisitTypes.KetamineFourVisit:
      return appointment.appointmentDuration
    default:
      return Number(defaultDuration)
  }
}

const getVisitSequence = (appointment: Appointment) => {
  switch (appointment.visitTypeCode) {
    case VisitTypes.Spravato:
    case VisitTypes.Tms:
    case VisitTypes.Ect:
    case VisitTypes.GroupTherapy:
    case VisitTypes.KetamineFourVisit:
      return VisitSequenceTypes.Na
    default:
      return VisitSequenceTypes.Establish
  }
}

const transformIn = (appointment: Appointment, defaultDuration?: string) => {
  let payload: Omit<
    BookVisitPayload,
    'isOverridePermissionProvided' | 'isProceedPermissionProvided'
  > = {
    appointmentId: 0,
    patientId: appointment.patientId,
    stateCode: appointment.stateCode,
    locationId: appointment.locationId,
    serviceId: appointment.serviceId,
    providerType: appointment.providerType,
    encounterType: getEncounterType(appointment),
    visitSequenceType: getVisitSequence(appointment),
    type: appointment.visitMedium,
    paymentResponsibilityTypeCode: appointment.paymentResponsibility,
    isFollowup: true,
    isPrimaryProviderType: appointment.isPrimaryProviderType,
    specialistStaffId: appointment.providerId,
    durationMinutes: 0,
    startDate: appointment.appointmentDate,
    visitFrequency: 1,
  }
  if (appointment.isServiceTimeDependent) {
    payload = {
      ...payload,
      durationMinutes: defaultDuration
        ? getDurationMinutes(appointment, defaultDuration)
        : appointment.appointmentDuration,
      dischargeDate: appointment.dischargeDate,
      dischargeLocation: appointment.dischargeLocationName,
      isEdVisit: appointment.isEdDischarge,
      visitFrequency: appointment.appointmentInterval ?? 0,
    }
  } else {
    payload = {
      ...payload,
      admissionId: appointment.facilityAdmissionDetailId,
      admissionDate: appointment.dateOfAdmission,
      appointmentStatus: appointment.visitStatus,
      insuranceVerificationStatusCode:
        appointment.patientInsuranceVerificationStatus,
      admissionLegalStatus: appointment.legalStatus,
      authorizationNumber: appointment.authorizationNumber,
      authorizationDate: appointment.authorizationDate,
      lastAuthorizationCoveredDate: appointment.lastCoverageDate,
      unitId: appointment.unitResource?.unit,
      roomId: appointment.roomResource?.room,
      groupId: appointment.groupResource?.group,
    }
  }
  return payload
}

const getCalendarDateTimeFromUTC = (date?: string) => {
  return date
    ? toCalendarDateTime(parseAbsolute(date, getLocalTimeZone()))
    : undefined
}

const shouldDisableFollowUpButton = (
  visitType: string,
  visitSequence: VisitSequenceTypes,
): boolean => {
  if (!isHospitalCareVisit(visitType)) return false

  return (
    visitSequence === VisitSequenceTypes.Discharge ||
    visitSequence === VisitSequenceTypes.InitialDischarge
  )
}

const getDefaultNext = (visitType: string, isServiceTimeDependent: boolean) => {
  if (!isServiceTimeDependent) {
    return '2 day'
  }
  switch (visitType) {
    case VisitTypes.IndividualPsychotherapy:
    case VisitTypes.FamilyPsychotherapy:
    case VisitTypes.GroupTherapy:
    case VisitTypes.Tms:
    case VisitTypes.Spravato:
    case VisitTypes.Ect:
    case VisitTypes.KetamineFourVisit:
      return '1 week'
    default:
      return '4 week'
  }
}

const isFollowupScheduled = (data: Appointment[]): boolean => {
  let isFollowupExists = false

  if (data.length > 0) {
    if (data[0].isFollowupCreatedforTimedService) {
      isFollowupExists = true
    } else {
      const tcmFollowupVisit = data.find(
        (followup) => followup.visitTypeCode === VisitTypeEnum.TransitionalCare,
      )
      isFollowupExists = !!tcmFollowupVisit
    }
  }

  return isFollowupExists
}

export {
  removeEmptyValues,
  getEndDate,
  transformIn,
  getOffsetStartDate,
  sanitizeFormData,
  getCalendarDateTimeFromUTC,
  shouldDisableFollowUpButton,
  getDefaultNext,
  isFollowupScheduled,
}
