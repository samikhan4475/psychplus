import toast from 'react-hot-toast'
import { updateVisitAction } from '@/actions'
import { Appointment, SharedCode } from '@/types'
import { TransformedAppointment } from '../types'
import { sanitizeFormData } from './form'

interface UpdateVisitParams {
  body: TransformedAppointment
  onSuccess: () => void
  onError?: (message: string, status?: number) => void
  successMessage?: string
}

const transformIn = (appointment: Appointment): TransformedAppointment => {
  const {
    appointmentId,
    patientId,
    stateCode,
    locationId,
    serviceId,
    providerType,
    visitTypeCode,
    visitSequence,
    visitMedium,
    isPrimaryProviderType,
    providerId,
    appointmentDate,
    appointmentDuration,
    appointmentInterval,
    visitStatus,
    unitResource,
    groupResource,
    roomResource,
    legalStatus,
    insuranceVerification,
    facilityAdmissionDetailId,
    isServiceTimeDependent,
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

  const transformedData = {
    appointmentId,
    patientId,
    stateCode,
    locationId,
    serviceId,
    providerType,
    encounterType: visitTypeCode ?? '',
    visitSequenceType: visitSequence,
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
    unitId: unitResource?.id,
    groupId: groupResource?.id,
    roomId: roomResource?.id,
    admissionLegalStatus: legalStatus,
    insuranceVerificationStatusCode: insuranceVerification,
    admissionId: isServiceTimeDependent ? undefined : facilityAdmissionDetailId,
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

const updateVisit = async ({
  body,
  onSuccess,
  onError,
  successMessage,
}: UpdateVisitParams) => {
  const sanitizedBody = sanitizeFormData(body)
  const result = await updateVisitAction(sanitizedBody)
  if (result.state === 'success') {
    toast.success(successMessage ?? 'Visit updated')
    onSuccess()
  } else {
    const errorMessage = result.error || 'Failed to update visit'
    onError ? onError(result.error, result.status) : toast.error(errorMessage)
  }
}

function sortVisitStatusCodes(codes: SharedCode[], attributeType?: string) {
  const filteredCodes = attributeType
    ? codes.filter((code) =>
        code.attributes?.find((attribute) => attribute.value === attributeType),
      )
    : codes
  return filteredCodes
    .toSorted((a, b) => {
      const aValue =
        a.attributes?.find((attr) => attr.name === 'SortValue')?.value ?? '0'
      const bValue =
        b.attributes?.find((attr) => attr.name === 'SortValue')?.value ?? '0'

      const aNumber = parseInt(aValue, 10)
      const bNumber = parseInt(bValue, 10)

      return aNumber - bNumber
    })
    .map((item) => ({
      label: item.display,
      value: item.value,
    }))
}

export { transformIn, updateVisit, sortVisitStatusCodes }
