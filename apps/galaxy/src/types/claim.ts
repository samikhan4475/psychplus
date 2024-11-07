import { DateValue } from 'react-aria-components'
import { ContactDetails, User } from './'
import { Metadata } from './metadata'

interface ClaimServiceLine {
  id?: string
  claimServiceLineId?: string
  metadata?: Metadata
  recordStatus?: string
  claimId: string
  cptCode?: string
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
  billedAmount?: string
  allowedAmount?: string
  paidAmount?: string
  copayAmount?: string
  coinsuranceAmount?: string
  deductibleAmount?: string
  otherPr?: string
  writeOffAmount?: string
  deletedReason?: string
  minutes?: string
  startTime?: string
  endTime?: string
  sequenceNo?: number
  dateOfServiceFrom?: DateValue
  dateOfServiceTo?: DateValue
  units?: number
  nationalDrugCodeQuantity?: number
  nationalDrugCodeMeasureUnit?: string
  unitAmount?: number
  totalAmount?: number
  placeOfService?: string
  isDoNotBill: boolean
  statusCode?: string
  isAnesthesia: boolean
}

interface ClaimDiagnosis {
  id?: string
  metadata?: Metadata
  recordStatus?: string
  claimId?: string
  diagnosisCode?: string
  diagnosisDescription?: string
  deletedReason?: string
  sequenceNo?: number
}

interface ClaimInsurance {
  id: string
  insurancePlanId: string
  verificationStatus: string
  isActive: boolean
  isDeleted: boolean
  memberId: string
  groupNumber: string
  effectiveDate: string
  terminationDate: string
  insurancePolicyPriority: string
  hasCardFrontImage: boolean
  hasCardBackImage: boolean
  isPatientPolicyHolder: boolean
  policyHolderRelationship: string
  policyHolderDateOfBirth: string
  policyHolderSocialSecurityNumber: string
  policyHolderGender: string
  policyName: string
  policyHolderStreetAddress: string
  payerAddress: string
  payerName: string
}

interface ClaimInsurance {
  id: string
  insurancePlanId: string
  verificationStatus: string
  isActive: boolean
  isDeleted: boolean
  memberId: string
  groupNumber: string
  effectiveDate: string
  terminationDate: string
  insurancePolicyPriority: string
  hasCardFrontImage: boolean
  hasCardBackImage: boolean
  isPatientPolicyHolder: boolean
  policyHolderRelationship: string
  policyHolderDateOfBirth: string
  policyHolderSocialSecurityNumber: string
  policyHolderGender: string
  policyName: string
  policyHolderStreetAddress: string
  payerAddress: string
  payerName: string
}

interface ClaimInsurancePolicy {
  id: string
  metadata: Metadata
  insurancePlanId: string
  verificationStatus: string
  isActive: boolean
  isDeleted: boolean
  memberId: string
  groupNumber: string
  effectiveDate: string
  terminationDate: string
  insurancePolicyPriority: string
  hasCardFrontImage: boolean
  hasCardBackImage: boolean
  isPatientPolicyHolder: boolean
  policyHolderRelationship: string
  policyHolderName: User
  policyHolderDateOfBirth: string
  policyHolderSocialSecurityNumber: string
  policyHolderGender: string
  policyName: string
  contactInfo: ContactDetails
  payerAddress: string
  payerName: string
}

interface Claim {
  id: string
  metadata?: Metadata
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
  primaryPatientInsurancePolicyId: string
  secondaryPatientInsurancePolicyId: string
  tertiaryPatientInsurancePolicyId: string
  primaryPatientInsurancePolicyName?: string
  secondaryPatientInsurancePolicyName?: string
  tertiaryPatientInsurancePolicyName?: string
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
  submittedDate?: string
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
  primaryPatientInsurancePlanId: string
  secondaryPatientInsurancePlanId: string
  tertiaryPatientInsurancePlanId: string
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
  patientDateOfBirth: string
  patientAccountNumber: string
  dos: string
  status: string
  totalCharge: string
  dueAmount: string
  createdOn: Date
  submittedOn: Date
  claimServiceLines: ClaimServiceLine[]
  claimDiagnosis: ClaimDiagnosis[]
  isSystemRejected: boolean
  primaryInsurance?: ClaimInsurance
  secondaryInsurance?: ClaimInsurance
  claimInsurancePolicies?: ClaimInsurancePolicy[]
}

interface ClaimUpdate {
  id?: string
  metadata?: Metadata
  recordStatus?: string
  practiceId?: string
  appointmentId?: number
  claimNumber?: string
  locationId?: string
  renderingProviderId?: string
  attendingProviderId?: string
  supervisingProviderId?: string
  orderingProviderId?: string
  referringProviderId?: string
  patientId?: number
  placeOfService?: string
  dateOfServiceFrom?: DateValue | string
  dateOfServiceTo?: DateValue | string
  claimType?: string
  isAnesthesiaClaim?: boolean
  authorizationNumber?: string
  referralNumber?: string
  clinicalLaboratoryImprovementAmendmentsNumber?: string
  claimNotes?: string
  payerClaimControlNumber?: string
  primaryStatusCode?: string
  secondaryStatusCode?: string
  tertiaryStatusCode?: string
  patientStatusCode?: string
  createFrom?: string
  deletedReason?: string
  totalAmount?: number
  amountDue?: number
  primaryPaid?: number
  secondaryPaid?: number
  tertiaryPaid?: number
  patientPaid?: number | null
  primaryWriteOff?: number
  secondaryWriteOff?: number
  tertiaryWriteOff?: number
  patientWriteOff?: number
  totalWriteOff?: number
  claimStatusCode?: string
  isMarkAsSubmitted: boolean
  isSubmitted: boolean
  submittedDate?: string
  isHoldStatement: boolean
  isResubmitted: boolean
  isForcePaper: boolean
  rejectionReason?: string
  isSelfPay: boolean
  isDraft: boolean
  isHold: boolean
  externalFileId?: number
  isClaimScrubbed?: boolean
  isForceUnlock: boolean
  forceUnlockBy?: number
  forceUnlockDate?: DateValue | string
  forceUnlockReason?: string
  primaryPatientInsurancePolicyId?: string
  secondaryPatientInsurancePolicyId?: string
  tertiaryPatientInsurancePolicyId?: string
  accidentDate?: DateValue | string
  accidentState?: string
  accidentType?: string
  isOutsideLab?: boolean
  labCharges?: number
  isEmployment: boolean
  isAutoAccident: boolean
  isOtherAccident: boolean
  claimFrequencyCode?: string
  lastSeenDate?: DateValue | string
  patientName: string
  patientAccountNumber: string
  patientGender: string
  patientDateOfBirth: string
  claimServiceLines: ClaimServiceLine[]
  claimDiagnosis: ClaimDiagnosis[]
}

interface DiagnosisCode {
  diagnosisCode: string
}

interface ICD10Code {
  id: number | string
  code: string
  description: string
  isFavorite: boolean
  isActive: boolean
}

interface CPTRecord {
  id: string
  gender: string
  category: string
  minimumAge: string
  maximumAge: string
  effectiveFrom: string
  effectiveTill: string
  placeOfService: string
  recordStatus: string
  cptCode: string
  description: string
  requirement: string
  medicareAmount: string
}

interface CodeItem {
  code: string
  displayName: string
  groupingCode: string
}

interface InsuranceClaimPolicy {
  effectiveDate?: string
  groupNumber?: string
  hasCardBackImage?: boolean
  hasCardFrontImage?: boolean
  id?: string
  insurancePlanId?: string
  insurancePolicyPriority?: string
  isActive?: boolean
  isDeleted?: boolean
  isPatientPolicyHolder?: boolean
  memberId?: string
  metadata?: Metadata
  policyName?: string
  terminationDate?: string
  verificationStatus?: string
}

interface ClaimUpdateApiResponse {
  id?: string
  metadata?: Metadata
  recordStatus?: string
  practiceId?: string
  appointmentId?: number
  claimNumber?: string
  locationId?: string
  renderingProviderId?: number
  attendingProviderId?: number
  supervisingProviderId?: number
  orderingProviderId?: number
  referringProviderId?: number
  patientId?: number
  placeOfService?: string
  dateOfServiceFrom?: string
  dateOfServiceTo?: string
  claimType?: string
  isAnesthesiaClaim?: boolean
  authorizationNumber?: string
  referralNumber?: string
  clinicalLaboratoryImprovementAmendmentsNumber?: string
  claimNotes?: string
  payerClaimControlNumber?: string
  primaryStatusCode?: string
  secondaryStatusCode?: string
  tertiaryStatusCode?: string
  patientStatusCode?: string
  createFrom?: string
  deletedReason?: string
  totalAmount?: number
  amountDue?: number
  primaryPaid?: number
  secondaryPaid?: number
  tertiaryPaid?: number
  patientPaid?: number | null
  primaryWriteOff?: number
  secondaryWriteOff?: number
  tertiaryWriteOff?: number
  patientWriteOff?: number
  totalWriteOff?: number
  claimStatusCode?: string
  isMarkAsSubmitted: boolean
  isSubmitted: boolean
  submittedDate?: string
  isHoldStatement: boolean
  isResubmitted: boolean
  isForcePaper: boolean
  rejectionReason?: string
  isSelfPay: boolean
  isDraft: boolean
  isHold: boolean
  externalFileId?: number
  isClaimScrubbed?: boolean
  isForceUnlock: boolean
  forceUnlockBy?: number
  forceUnlockDate?: string
  forceUnlockReason?: string
  primaryPatientInsurancePolicyId?: string
  secondaryPatientInsurancePolicyId?: string
  tertiaryPatientInsurancePolicyId?: string
  accidentDate?: string
  accidentState?: string
  accidentType?: string
  isOutsideLab?: boolean
  labCharges?: number
  isEmployment: boolean
  isAutoAccident: boolean
  isOtherAccident: boolean
  claimFrequencyCode?: string
  lastSeenDate?: string
  patientName: string
  patientAccountNumber: string
  patientGender: string
  patientDateOfBirth: string
  claimServiceLines: ClaimServiceLineApiResponse[]
  claimDiagnosis: ClaimDiagnosisApiResponse[]
}

interface ClaimServiceLineApiResponse {
  id?: string
  metadata?: Metadata
  recordStatus?: string
  claimId: string
  cptCode?: string
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
  sequenceNo?: number
  dateOfServiceFrom?: string
  dateOfServiceTo?: string
  units?: number
  nationalDrugCodeQuantity?: number
  nationalDrugCodeMeasureUnit?: string
  unitAmount?: number
  totalAmount?: number
  placeOfService?: string
  isDoNotBill: boolean
  statusCode?: string
  isAnesthesia: boolean
}

interface ClaimDiagnosisApiResponse {
  id?: string
  metadata?: Metadata
  recordStatus?: string
  claimId?: string
  diagnosisCode?: string
  diagnosisDescription?: string
  deletedReason?: string
  sequenceNo?: number
}

export type {
  Claim,
  ClaimUpdate,
  CodeItem,
  CPTRecord,
  ICD10Code,
  DiagnosisCode,
  ClaimServiceLine,
  ClaimInsurancePolicy,
  ClaimDiagnosis,
  InsuranceClaimPolicy,
  ClaimUpdateApiResponse,
  ClaimServiceLineApiResponse,
  ClaimDiagnosisApiResponse,
}
