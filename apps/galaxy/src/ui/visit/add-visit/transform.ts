import { parseZonedDateTime } from '@internationalized/date'
import { SelectOptionType, VisitType } from '@/types'
import { BookVisitPayload } from '../types'
import { SchemaType } from './schema'

function transformRequestPayload(
  data: SchemaType,
  selectedVisitType: VisitType | undefined,
) {
  let specialistStaffId = 0
  if (data.isServiceTimeDependent && data.provider)
    specialistStaffId = parseInt(data.provider)
  if (!data.isServiceTimeDependent && data.admittingProvider)
    specialistStaffId = parseInt(data.admittingProvider)
  let payload: BookVisitPayload = {
    appointmentId: 0,
    patientId: data.patient?.id ?? 0,
    stateCode: data.state,
    locationId: data.location,
    serviceId: data.service,
    providerType: data.providerType,
    encounterType: selectedVisitType?.visitTypeCode,
    visitSequenceType: data.visitSequence,
    type: data.visitMedium,
    paymentResponsibilityTypeCode: data.paymentResponsibility,
    isFollowup: false,
    isNewAdmissionIdRequired: false,
    isPrimaryProviderType: data.isPrimaryProviderType,
    isOverridePermissionProvided: data.isOverridePermissionProvided,
    isProceedPermissionProvided: data.isProceedPermissionProvided,
    specialistStaffId,
    startDate: '',
    durationMinutes: 0,
    visitFrequency: '',
  }
  if (data.isServiceTimeDependent) {
    payload = {
      ...payload,
      startDate: mapToUTCString(
        `${data.visitDate}T${data.visitTime}:00[${data.timeZoneId}]`,
      ),
      durationMinutes: data.duration ? parseInt(data.duration) : 0,
      visitFrequency: data.frequency ?? '',
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
    const dateTimeOfAdmission = mapToUTCString(
      `${data.dateOfAdmission}T${data.timeOfAdmission}:00[${data.timeZoneId}]`,
    )
    payload = {
      ...payload,
      startDate: dateTimeOfAdmission,
      admissionDate: dateTimeOfAdmission,
      dischargeDate: data.dischargeDate
        ? data.dischargeDate?.toString()
        : undefined,
      visitFrequency: data.visitFrequency ?? '',
      appointmentStatus: data.visitStatus,
      admissionLegalStatus: data.legal,
      authorizationNumber: data.insuranceAuthorizationNumber,
      authorizationDate: data.authDate ? data.authDate.toString() : undefined,
      unitId: data.unit,
      roomId: data.room,
      groupId: data.group,
    }
    if (data.facilityAdmissionId !== 'createNew') {
      payload.admissionId = data.facilityAdmissionId
    } else {
      payload.isNewAdmissionIdRequired = true
    }
  }
  return payload
}

function mapToUTCString(date: string): string {
  const parsedDateTime = parseZonedDateTime(date)
  return parsedDateTime.toAbsoluteString()
}

const transformNonTimedVisitTypes = (data: VisitType[]) => {
  const filteredVisitTypes: VisitType[] = []
  const groupedVisitTypes: { [key: string]: VisitType[] } = {}

  data.forEach((visitType) => {
    if (!groupedVisitTypes[visitType.visitTypeCode]) {
      groupedVisitTypes[visitType.visitTypeCode] = [visitType]
    } else {
      groupedVisitTypes[visitType.visitTypeCode].push(visitType)
    }
    if (
      !filteredVisitTypes.find(
        (vt) => vt.visitTypeCode === visitType.visitTypeCode,
      )
    ) {
      filteredVisitTypes.push(visitType)
    }
  })

  return {
    groupedVisitTypes,
    filteredVisitTypes: filteredVisitTypes.toSorted((a, b) => {
      if (a.typeOfVisit > b.typeOfVisit) return 1
      else if (a.typeOfVisit < b.typeOfVisit) return -1
      return 0
    }),
  }
}

const transformTimedVisitTypes = (data: VisitType[]) => {
  return data.sort((a, b) => {
    if (a.typeOfVisit < b.typeOfVisit) return -1
    else if (a.typeOfVisit > b.typeOfVisit) return 1
    else if (a.visitSequence < b.visitSequence) return -1
    else if (a.visitSequence > b.visitSequence) return 1
    else if (a.visitMedium < b.visitMedium) return -1
    else if (a.visitMedium > b.visitMedium) return 1
    return 0
  })
}

export {
  transformRequestPayload,
  transformNonTimedVisitTypes,
  transformTimedVisitTypes,
}
