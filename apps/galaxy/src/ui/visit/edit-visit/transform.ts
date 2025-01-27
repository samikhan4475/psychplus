import { parseZonedDateTime } from '@internationalized/date'
import { BookVisitPayload, VisitType } from '@/types'
import { SchemaType } from './schema'

function transformRequestPayload(
  data: SchemaType,
  selectedVisitType: VisitType | undefined,
) {
  let payload: BookVisitPayload = {
    appointmentId: data.appointmentId,
    patientId: data.patient.id,
    stateCode: data.state,
    locationId: data.location,
    serviceId: data.service,
    providerType: data.providerType,
    encounterType: selectedVisitType?.visitTypeCode,
    visitSequenceType: data.visitSequence,
    type: data.visitMedium,
    paymentResponsibilityTypeCode: data.paymentResponsibility,
    isFollowup: false,
    isPrimaryProviderType: data.isPrimaryProviderType,
    isOverridePermissionProvided: data.isOverridePermissionProvided,
    isProceedPermissionProvided: data.isProceedPermissionProvided,
    specialistStaffId: 0,
    startDate: mapToUTCString(
      `${data.visitDate}T${data.visitTime}:00[${data.timeZoneId}]`,
    ),
    durationMinutes: 0,
    visitFrequency: 0,
  }
  if (data.isServiceTimeDependent) {
    payload = {
      ...payload,
      specialistStaffId: data.provider ? parseInt(data.provider) : 0,
      durationMinutes: data.duration ? parseInt(data.duration) : 0,
      visitFrequency: data.frequency ? parseInt(data.frequency) : 0,
    }
    if (data.showGroupTypeField) {
      payload.groupTherapyTypeCode = data.groupType
    }
    if (data.showDCFields) {
      payload.dischargeDate = data.dcDate?.toString()
      payload.dischargeLocation = data.dcLocation
      payload.isEdVisit = data.edDischarge === 'Yes'
    }
  } else {
    payload = {
      ...payload,
      specialistStaffId: data.admittingProvider
        ? parseInt(data.admittingProvider)
        : 0,
      admissionId: data.facilityAdmissionDetailId,
      admissionDate: mapToUTCString(
        `${data.dateOfAdmission}T${data.timeOfAdmission}:00[${data.timeZoneId}]`,
      ),
      visitFrequency: data.visitFrequency ? parseInt(data.visitFrequency) : 0,
      appointmentStatus: data.visitStatus,
      insuranceVerificationStatusCode: data.insuranceVerificationStatus,
      admissionLegalStatus: data.legal,
      authorizationNumber: data.insuranceAuthorizationNumber,
      authorizationDate: data.authDate ? data.authDate.toString() : undefined,
      lastAuthorizationCoveredDate: data.lastCoverageDate
        ? data.lastCoverageDate.toString()
        : undefined,
      unitId: data.unit,
      roomId: data.room,
      groupId: data.group,
    }
  }
  return payload
}

function mapToUTCString(date: string): string {
  const parsedDateTime = parseZonedDateTime(date)
  return parsedDateTime.toAbsoluteString()
}

export { transformRequestPayload }
