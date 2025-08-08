import { parseZonedDateTime, today } from '@internationalized/date'
import {
  Appointment,
  BookVisitPayload,
  ClaimDiagnosis,
  ClaimServiceLine,
  VisitType,
} from '@/types'
import { getDateString } from '@/ui/schedule/utils'
import { getPaddedDateString } from '@/utils'
import { SchemaType } from './schema'

function transformRequestPayload(
  data: SchemaType,
  selectedVisitType: VisitType | undefined,
  visitDetails: Appointment,
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
    isOverridePermissionProvided: data.isCustomAppointment
      ? true
      : data.isOverridePermissionProvided,
    isProceedPermissionProvided: data.isCustomAppointment
      ? false
      : data.isProceedPermissionProvided,
    isOverridePrimaryProvider: data.isOverridePrimaryProvider,
    specialistStaffId: 0,
    startDate: '',
    durationMinutes: 0,
    visitFrequency: 0,
    isCustomAppointment: data.isCustomAppointment,
    authorizationNumber: data.authorizationNumber,
    authorizationDate: data.authorizationDate
      ? getPaddedDateString(data.authorizationDate)
      : undefined,
  }
  if (data.isServiceTimeDependent) {
    payload = transformTimedRequestPayload(data, payload)
  } else {
    payload = transformNonTimedRequestPayload(data, payload, visitDetails)
  }
  return payload
}

interface UpdateLinesParams {
  timeZone: string
  rawCptCodes: string
  rawDiagnosisCodes: string
  existingLines: ClaimServiceLine[]
  existingDiagnoses: ClaimDiagnosis[]
  claimId: string
}
function transformClaimServiceLines({
  timeZone,
  rawCptCodes,
  rawDiagnosisCodes,
  existingLines,
  existingDiagnoses,
  claimId,
}: UpdateLinesParams) {
  const todayDate = today(timeZone)

  const inputCptCodes = rawCptCodes
    .split(',')
    .map((code) => code.trim())
    .filter(Boolean)

  const usedCptCodes = new Set<string>()
  const preservedLines: ClaimServiceLine[] = []

  for (const line of existingLines) {
    const cpt = line.cptCode ?? ''
    if (inputCptCodes.includes(cpt)) {
      preservedLines.push(line)
      usedCptCodes.add(cpt)
    } else if (line.id) {
      preservedLines.push({ ...line, recordStatus: 'Deleted' })
    }
  }

  const freshCptLines: Omit<
    ClaimServiceLine,
    'dateOfServiceFrom' | 'dateOfServiceTo'
  >[] = inputCptCodes
    .filter((code) => !usedCptCodes.has(code))
    .map((code, idx) => ({
      recordStatus: 'Active',
      claimId,
      chargeId: '',
      cptCode: code,
      modifierCode1: '',
      modifierCode2: '',
      sequenceNo: preservedLines.length + idx + 1,
      dateOfServiceFrom: getDateString(todayDate),
      dateOfServiceTo: getDateString(todayDate),
      units: 0,
      unitAmount: 0,
      totalAmount: 0,
      placeOfService: '',
      isDoNotBill: false,
      statusCode: 'NewCharge',
      isAnesthesia: false,
    }))

  const allServiceLines = [...preservedLines, ...freshCptLines]

  const maxDiagnosis = 12
  const inputDiagnosisCodes = rawDiagnosisCodes
    .split(',')
    .map((code) => code.trim())
    .filter(Boolean)
    .slice(0, maxDiagnosis)

  const usedDiagnosisCodes = new Set<string>()
  const preservedDiagnoses: ClaimDiagnosis[] = []

  for (const diag of existingDiagnoses) {
    const code = diag.diagnosisCode ?? ''
    if (inputDiagnosisCodes.includes(code)) {
      preservedDiagnoses.push(diag)
      usedDiagnosisCodes.add(code)
    } else if (diag.id) {
      preservedDiagnoses.push({ ...diag, recordStatus: 'Deleted' })
    }
  }

  const activeDiagnosisCount = preservedDiagnoses.filter(
    (d) => d.recordStatus !== 'Deleted',
  ).length

  const freshDiagnoses: ClaimDiagnosis[] = inputDiagnosisCodes
    .filter((code) => !usedDiagnosisCodes.has(code))
    .map((code, idx) => ({
      claimId,
      diagnosisCode: code,
      deletedReason: '',
      sequenceNo: activeDiagnosisCount + idx + 1,
      recordStatus: 'Active',
    }))

  const allDiagnoses = [...preservedDiagnoses, ...freshDiagnoses]

  const activeDiagnoses = allDiagnoses
    .filter((d) => d.recordStatus !== 'Deleted')
    .map((d, idx) => ({ ...d, sequenceNo: idx + 1 }))

  const finalDiagnoses: ClaimDiagnosis[] = allDiagnoses.map((d) => {
    if (d.recordStatus === 'Deleted') return d

    const match = d.id
      ? activeDiagnoses.find((a) => a.id === d.id)
      : activeDiagnoses.find((a) => a.diagnosisCode === d.diagnosisCode)

    return match ?? d
  })

  type DiagnosisPointerKey =
    | 'diagnosisPointer1'
    | 'diagnosisPointer2'
    | 'diagnosisPointer3'
    | 'diagnosisPointer4'

  allServiceLines.forEach((line) => {
    for (let i = 0; i < 4; i++) {
      const key = `diagnosisPointer${i + 1}` as DiagnosisPointerKey
      line[key] = activeDiagnoses[i] ? (i + 1).toString() : ''
    }
  })

  return {
    updatedServiceLines: allServiceLines,
    updatedDiagnoses: finalDiagnoses,
  }
}
function transformTimedRequestPayload(
  data: SchemaType,
  payload: BookVisitPayload,
) {
  payload = {
    ...payload,
    startDate: mapToUTCString(
      `${data.visitDate}T${data.visitTime}:00[${data.timeZoneId}]`,
    ),
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
  return { ...payload }
}

function transformNonTimedRequestPayload(
  data: SchemaType,
  payload: BookVisitPayload,
  visitDetails: Appointment,
) {
  return {
    ...payload,
    startDate: visitDetails?.appointmentDate,
    specialistStaffId: data.admittingProvider
      ? parseInt(data.admittingProvider)
      : 0,
    admissionId: data.facilityAdmissionDetailId,
    admissionDate: mapToUTCString(
      `${data.dateOfAdmission}T${data.timeOfAdmission}:00[${data.timeZoneId}]`,
    ),
    dischargeDate: data.dischargeDate
      ? data.dischargeDate.toString()
      : undefined,
    visitFrequency: data.visitFrequency ? parseInt(data.visitFrequency) : 0,
    appointmentStatus: data.visitStatus,
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

function mapToUTCString(date: string): string {
  const parsedDateTime = parseZonedDateTime(date)
  return parsedDateTime.toAbsoluteString()
}

export { transformRequestPayload, transformClaimServiceLines }
