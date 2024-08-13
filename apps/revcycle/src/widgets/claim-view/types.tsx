interface MetaData {
  createdOn: Date
  createdBy: number
  createdByFullName: string
  updatedOn: Date
  updatedBy: number
  updatedByFullName: string
  deletedOn: Date
  deletedBy: number
  deletedByFullName: string
}

interface ClaimServiceLine {
  id?: string
  metadata?: MetaData
  recordStatus: string
  claimId: string
  cptCode: string
  cptDescription: string
  nationalDrugCode: string
  modifierCode1: string
  modifierCode2: string
  modifierCode3: string
  modifierCode4: string
  diagnosisPointer1: string
  diagnosisPointer2: string
  diagnosisPointer3: string
  diagnosisPointer4: string
  serviceLineNotes: string
  authorizationNumber: string
  deletedReason: string
  minutes: string
  startTime: string
  endTime: string
  sequenceNo: number
  dateOfServiceFrom: Date
  dateOfServiceTo: Date
  units: number
  nationalDrugCodeQuantity: number
  nationalDrugCodeMeasureUnit: string
  unitAmount: number
  totalAmount: number
  placeOfService: string
  isDoNotBill: true
  statusCode: string
}

interface ClaimDiagnosis {
  id?: string
  metadata?: MetaData
  recordStatus: string
  claimId: string
  diagnosisCode: string
  diagnosisDescription: string
  deletedReason: string
  sequenceNo: number
}

interface Claim {
  id?: string
  metadata?: MetaData
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
  isAnesthesiaClaim: boolean
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
  patientPaid: number
  primaryWriteOff: number
  secondaryWriteOff: number
  tertiaryWriteOff: number
  patientWriteOff: number
  totalWriteOff: number
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
  externalFileId: number
  isClaimScrubbed: boolean
  isForceUnlock: boolean
  forceUnlockBy: number
  forceUnlockDate: Date
  forceUnlockReason: string
  primaryPatientInsurancePlanId: Date
  secondaryPatientInsurancePlanId: Date
  tertiaryPatientInsurancePlanId: Date
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

interface Location {
  id: string
  metadata: MetaData
  isTest: boolean
  name: string
  group: string
  description: string
  distanceInMiles: number
}

interface InsurancePayer {
  id: string
  name: string
}

interface InsurancePayerOption {
  value: string
  name: string
}

interface DateTypeOption {
  value: string
  name: string
}

interface LocationOption {
  value: string
  name: string
}

export type {
  Claim,
  InsurancePayer,
  InsurancePayerOption,
  DateTypeOption,
  LocationOption,
  Location,
}
