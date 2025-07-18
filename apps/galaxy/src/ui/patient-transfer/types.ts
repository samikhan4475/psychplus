// eslint-disable-next-line @typescript-eslint/no-unused-vars


interface PatientTransferSearchParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  isIncludePatientInsurancePolicy?: boolean
  isIncludeClaimValidation?: boolean
  isIncludePatientAppointments?: boolean
  isIncludePatient?: boolean
  isIncludeDiagnosis?: boolean
  isIncludeServiceLine?: boolean
  firstName?: string
  lastName?: string
  age?: number | null
  gender?: string
  mrn?: string
  dateOfBirth?: string
  city?: string
  zip?: string
  hasGuardian?: string
  phone?: string
  email?: string
  service?: string[]
  fromDate?: string | null
  endDate?: string | null
  serviceStatus: string[]
  insurance?: string
  legal?: string
  linked?: string
  facesheet?: string
  documents?: string
  timeElapsed?: string | null
}
interface PatientTransferPayload {
  firstName?: string
  lastName?: string
  age?: number | null
  gender?: string
  mrn?: string
  dateOfBirth?: string
  city?: string
  zip?: string
  hasGuardian?: string
  phone?: string
  email?: string
  service?: string[]
  fromDate?: string | null
  endDate?: string | null
  serviceStatus?: string[]
  insurance?: string
  legal?: string
  linked?: string
  facesheet?: string
  documents?: string
  timeElapsed?: string | null
}

interface PatientTransfer {
  firstName?: string
  middleName?: string
  lastName?: string
  dateOfBirth?: string
  age?: string
  gender: string
  guardian: string
  phone?: number
  email?: string
  last4ss?: string
  legal?: string
  insurance?: string
  linked?: string
  facesheet?: string
  details?: string
  documents?: string
  transferingLocation?: string
  transferingNurse?: string
  transferingNursePhoneNumber?: string
  acceptingLocation?: string
  acceptingNurse?: string
  acceptingNursePhoneNumber?: string
  service?: string
  transferingFacility?: string
  acceptingFacility?: string
  user?: string
  date?: string
  timeElapsed?: string
}

interface PatientTransferRecord {
  id: string
  recordStatus: string
  receiverId: string
  receiverName: string
  submitterId: string
  submitterName: string
  practiceId: string
  practiceName: string
  zipFilePath: string
  fileType: string
  processingStatus: string
  isProcessed: string
  isManualImport: boolean
  isCheckAlreadyExists: boolean
  transcationReferenceNumber: boolean
  fileCount: number
  filePath?: string
}

interface PatientTransferListResponse {
  transferHistory: PatientTransferRecord[]
  total: number
}

export {
  type PatientTransferSearchParams,
  type PatientTransferListResponse,
  type PatientTransferPayload,
  type PatientTransferRecord,
  type PatientTransfer,
}
