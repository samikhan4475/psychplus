import { parseAbsoluteToLocal } from '@internationalized/date'
import { Appointment, BookVisitPayload, VisitTypes } from '@/types'
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

const transformIn = (appointment: Appointment) => {
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
    visitSequenceType: appointment.visitSequence,
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
      durationMinutes: appointment.appointmentDuration ?? 0,
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

export {
  removeEmptyValues,
  getEndDate,
  transformIn,
  getOffsetStartDate,
  sanitizeFormData,
}
