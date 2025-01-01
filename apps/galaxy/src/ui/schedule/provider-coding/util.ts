import { getDayOfWeek, parseAbsolute } from '@internationalized/date'
import { TransformedAppointment } from '../types'
import { MergedRecord, WeekdayData } from './types'
import { DAY_KEYS } from './constants'
import { START_OF_WEEK_LOCALE } from '../constants'

const transformIn = (
  appointment: MergedRecord,
  day?: string,
): TransformedAppointment => {
  const {
    patientId,
    stateCode,
    locationId,
    serviceId,
    providerType,
    providerId,
    appointmentDate,
    appointmentDuration,
    appointmentInterval,
    unitResource,
    facilityAdmissionDetailId,
    groupResource,
    roomResource,
    legalStatus,
    insuranceVerification,
    paymentResponsibility,
    dischargeDate,
    dischargeLocationName,
    isEdDischarge,
    dateOfAdmission,
    authorizationNumber,
    authorizationDate,
    lastCoverageDate,
    groupTherapyTypeCode,
  } = appointment

  const {
    appointmentId,
    visitType,
    visitSequence,
    visitMedium,
    isPrimaryProviderType,
    visitStatus,
  } = day ? appointment.weekDays[day] ?? ({} as WeekdayData) : ({} as WeekdayData)

  const transformedData = {
    appointmentId: appointmentId ?? 0,
    patientId: patientId ?? 0,
    stateCode: stateCode ?? '',
    locationId: locationId ?? '',
    serviceId,
    providerType: providerType ?? '',
    encounterType: visitType ?? '',
    visitSequenceType: visitSequence ?? '',
    type: visitMedium,
    isFollowup: false,
    isPrimaryProviderType,
    specialistStaffId: providerId,
    startDate: appointmentDate,
    durationMinutes: appointmentDuration,
    visitFrequency: appointmentInterval,
    isOverridePermissionProvided: false,
    isProceedPermissionProvided: false,
    appointmentStatus: visitStatus,
    unitId: unitResource?.id ?? '',
    admissionId: facilityAdmissionDetailId,
    groupId: groupResource?.id ?? '',
    roomId: roomResource?.id,
    admissionLegalStatus: legalStatus,
    insuranceVerificationStatusCode: insuranceVerification,
    paymentResponsibilityTypeCode: paymentResponsibility,
    dischargeDate,
    dischargeLocation: dischargeLocationName,
    isEdVisit: isEdDischarge,
    admissionDate: dateOfAdmission,
    authorizationNumber,
    authorizationDate,
    lastAuthorizationCoveredDate: lastCoverageDate,
    groupTherapyTypeCode,
  }
  return transformedData
}

const extractWeekDay = (dateString: string, timezone: string): string => {
  const zonedDate = parseAbsolute(dateString, timezone)
  const dayLabel = getDayOfWeek(zonedDate, START_OF_WEEK_LOCALE)
  const { month, day } = zonedDate
  return `${DAY_KEYS[dayLabel]} ${month}/${day}`
}

export { transformIn, extractWeekDay }
