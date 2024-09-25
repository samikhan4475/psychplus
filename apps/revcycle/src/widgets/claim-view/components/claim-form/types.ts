interface SubmissionResponseType {
  entry_date: string
  status_date: string
  status: string
  patient_account: string
  response: string
  response_from: string
  payer_control: string
  category_code: string
  status_code: string
}

interface Charge {
  units: string
  amount: string
  total_amount: string
}

interface Metadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
  updatedOn: string
  updatedBy: number
  updatedByFullName: string
  deletedOn: string
  deletedBy: number
  deletedByFullName: string
}

interface ClaimServiceLine {
  id?: string | null
  recordStatus?: string
  claimId: string
  cptCode: string
  cptDescription?: string
  nationalDrugCode?: string
  modifierCode1?: string
  modifierCode2?: string
  modifierCode3?: string
  modifierCode4?: string
  diagnosisPointer1?: string
  diagnosisPointer2?: string
  diagnosisPointer3?: string
  diagnosisPointer4?: string
  serviceLineNotes?: string
  authorizationNumber?: string
  deletedReason?: string
  minutes?: string
  startTime?: string
  endTime?: string
  sequenceNo: number | null
  dateOfServiceFrom: Date
  dateOfServiceTo: Date
  units?: number | null
  // nationalDrugCodeQuantity?: number | null;
  nationalDrugCodeMeasureUnit?: string
  unitAmount?: number | null
  totalAmount: number | null
  placeOfService?: string
  isDoNotBill?: boolean | null
  statusCode?: string
  isAnesthesia?: boolean | null
}

interface ClaimDiagnosis {
  id: string
  metadata: Metadata
  recordStatus: string
  claimId: string
  diagnosisCode: string
  diagnosisDescription: string
  deletedReason: string
  sequenceNo: number
}

interface Claim {
  id: string
  metadata: Metadata
  recordStatus: string
  practiceId: string
  appointmentId: number
  claimNumber: string
  locationId: string
  renderingProviderId: number
  attendingProviderId: number
  supervisingProviderId: number
  orderingProviderId: number
  referringProviderId: number
  patientId: number
  placeOfService: string
  dateOfServiceFrom: Date
  dateOfServiceTo: Date
  claimType: string
  isAnesthesiaClaim?: boolean
  authorizationNumber: string
  referralNumber: string
  clinicalLaboratoryImprovementAmendmentsNumber: string
  claimNotes: string
  payerClaimControlNumber: string
  primaryStatusCode: string
  secondaryStatusCode: string
  tertiaryStatusCode: string
  patientStatusCode: string
  createFrom: string
  deletedReason: string
  totalAmount: number
  amountDue: number
  primaryPaid: number
  secondaryPaid: number
  tertiaryPaid: number
  patientPaid?: number | null
  primaryWriteOff?: number
  secondaryWriteOff?: number
  tertiaryWriteOff?: number
  patientWriteOff?: number
  totalWriteOff?: number
  claimStatusCode: string
  isMarkAsSubmitted: boolean
  isSubmitted: boolean
  submittedDate: Date
  isHoldStatement: boolean
  isResubmitted: boolean
  isForcePaper: boolean
  rejectionReason: string
  isSelfPay: boolean
  isDraft: boolean
  isHold: boolean
  externalFileId?: number
  isClaimScrubbed: boolean
  isForceUnlock: boolean
  forceUnlockBy?: number
  forceUnlockDate: Date
  forceUnlockReason: string
  primaryPatientInsurancePolicyId?: string
  secondaryPatientInsurancePolicyId?: string
  tertiaryPatientInsurancePolicyId?: string
  accidentDate: Date
  accidentState: string
  accidentType: string
  isOutsideLab: boolean
  labCharges: number
  isEmployment: boolean
  isAutoAccident: boolean
  isOtherAccident: boolean
  claimFrequencyCode: string
  lastSeenDate: Date
  patientName: string
  patientAccountNumber: string
  claimServiceLines: ClaimServiceLine[]
  claimDiagnosis: ClaimDiagnosis[]
}

export type {
  SubmissionResponseType,
  Charge,
  Claim,
  ClaimDiagnosis,
  Metadata,
  ClaimServiceLine,
}
