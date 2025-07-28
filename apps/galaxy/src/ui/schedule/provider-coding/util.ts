import { getDayOfWeek, parseAbsolute } from '@internationalized/date'
import { START_OF_WEEK_LOCALE } from '../constants'
import { TransformedAppointment } from '../types'
import { DAY_KEYS } from './constants'
import { MergedRecord, WeekdayData } from './types'

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
    appointmentId: baseAppointmentId,
    visitTypeCode: baseVisitType,
    visitStatus: baseVisitStatus,
    visitMedium: baseVisitMedium,
    visitSequence: baseVisitSequence,
  } = appointment

  const {
    appointmentId,
    visitType,
    visitSequence,
    visitMedium,
    isPrimaryProviderType,
    visitStatus,
  } = day
    ? appointment.weekDays[day] ?? ({} as WeekdayData)
    : ({} as WeekdayData)

  const transformedData = {
    appointmentId: day ? (appointmentId ?? 0) : (baseAppointmentId ?? 0),
    patientId: patientId ?? 0,
    stateCode: stateCode ?? '',
    locationId: locationId ?? '',
    serviceId,
    providerType: providerType ?? '',
    encounterType: (day ? visitType : baseVisitType) ?? '',
    visitSequenceType: (day ? visitSequence : baseVisitSequence) ?? '',
    type: (day ? visitMedium : baseVisitMedium) ?? '',
    isFollowup: false,
    isPrimaryProviderType,
    specialistStaffId: providerId,
    startDate: appointmentDate,
    durationMinutes: appointmentDuration,
    visitFrequency: appointmentInterval,
    isOverridePermissionProvided: false,
    isProceedPermissionProvided: false,
    appointmentStatus: (day ? visitStatus : baseVisitStatus) ?? '',
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
