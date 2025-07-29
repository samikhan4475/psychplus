import { DateValue } from 'react-aria-components'
import { ContactDetails, LegalName, PayerPlanAddress, User } from './'
import { Metadata } from './metadata'
import { Address } from '@/ui/staff-management/types'

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
  chargeId?: string
  lastSeenDate?: string
  onsetOfCurrentIllness?: DateValue
  firstSimilarIllness?: DateValue
  lastMenstrualPeriod?: DateValue
  admissionDate?: DateValue
  dischargeDate?: DateValue
  lastXRayDate?: DateValue
  lastXRayType?: DateValue
  startDateOfInabilityToWork?: DateValue
  endDateOfInabilityToWork?: DateValue
  payerClaimControlNumber?: string
  claimFrequencyCode?: string
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
  claimId: string
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
  patientGender: string
  serviceType?: string
  visitTypeCode?: string
  visitStatus?: string
  copayDue?: string
  copayPaid?: string
  coinsDue?: string
  coinsPaid?: string
  balanceDue?: string
  balancePaid?: string
  patientAge?: number
  visitMediumTypeCode?: string
  providerType?: string
  cosignerName?: string
  diagnosisCode?: string
  diagnosisCodes?: string
  providerName?: string
  cptCodes?: string
  cmdId?: string
  verificationIdentificationStatus?: string
  billingStatusCode?: string
  claimInsurancePolicies?: ClaimInsurancePolicy[]
  noteSignedStatus?: string
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
  patientPaid?: number
  primaryWriteOff?: number
  secondaryWriteOff?: number
  tertiaryWriteOff?: number
  patientWriteOff?: number
  totalWriteOff?: number
  claimStatusCode?: string
  isMarkAsSubmitted: boolean
  isSubmitted: boolean
  submittedDate?: DateValue | string
  submissionBatchId?: string
  systemValidationMessage?: string
  rejectionReason?: string
  isHoldStatement: boolean
  isResubmitted: boolean
  isForcePaper: boolean
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
  patientAccountNumber?: string
  patientGender: string
  patientDateOfBirth: string
  claimServiceLines: ClaimServiceLine[]
  claimDiagnosis: ClaimDiagnosis[]
  onsetOfCurrentIllness?: DateValue | string
  firstSimilarIllness?: DateValue | string
  lastMenstrualPeriod?: DateValue | string
  admissionDate?: DateValue | string
  dischargeDate?: DateValue | string
  lastXRayDate?: DateValue | string
  lastXRayType?: string
  startDateOfInabilityToWork?: DateValue | string
  endDateOfInabilityToWork?: DateValue | string
  updatedByName?: string
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
  npAmount: number
  paAmount: number
  mdDoAmount: number
  psyDAmount: number
  mastersAmount: number
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
  viewHcfa?: boolean
  policyHolderRelationship?: string
  payerPlanAddress?: Address
  claimStatus?: string
}

interface ClaimUpdateApiResponse {
  id?: string
  metadata?: Metadata
  recordStatus?: string
  practiceId?: string
  appointmentId?: number
  claimNumber?: string
  locationId?: string
  renderingProviderId?: number | null
  renderingProviderName?: LegalName
  attendingProviderId?: number | null
  attendingProviderName?: LegalName
  supervisingProviderId?: number | null
  supervisingProviderName?: LegalName
  orderingProviderId?: number | null
  orderingProviderName?: LegalName
  referringProviderId?: number | null
  referringProviderName?: LegalName
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
  patientPaid?: number
  primaryWriteOff?: number
  secondaryWriteOff?: number
  tertiaryWriteOff?: number
  patientWriteOff?: number
  totalWriteOff?: number
  claimStatusCode?: string
  isMarkAsSubmitted: boolean
  isSubmitted: boolean
  submittedDate?: string
  submissionBatchId?: string
  systemValidationMessage?: string
  rejectionReason?: string
  isHoldStatement: boolean
  isResubmitted: boolean
  isForcePaper: boolean
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
  onsetOfCurrentIllness?: string
  firstSimilarIllness?: string
  lastMenstrualPeriod?: string
  admissionDate?: string
  dischargeDate?: string
  lastXRayDate?: string
  lastXRayType?: string
  startDateOfInabilityToWork?: string
  endDateOfInabilityToWork?: string
  patientName: string
  patientAccountNumber?: string
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

interface ServiceMasterFeeScheduleResponse {
  id: string
  gender: string
  category: string
  minimumAge: number
  maximumAge: number
  metadata: Metadata
  placeOfService: string
  recordStatus: string
  cptCode: string
  description: string
  requirement: string
  paAmount: number
  mdDoAmount: number
  npAmount: number
  psyDAmount: number
  mastersAmount: number
}
interface ClaimSubmissionResponse {
  recordStatus?: string
  entryDate?: string
  status?: string
  patientAccount?: string
  response?: string
  categoryCode?: string
  statusCode?: string
  payerControlNumber?: string
  receiverName?: string
}

interface ClaimNotesFilter {
  claimId: string
  recordStatuses: string[]
  isAlert: boolean[]
}

interface ClaimNotesResponse {
  id?: string
  metadata?: Metadata
  claimId?: string
  note?: string
  effectiveDateFrom?: string
  effectiveDateTo?: string
  isAlert?: boolean
  recordStatus?: string
}
interface AddClaimNotes {
  id?: string
  claimId: string
  note: string
  effectiveDateTo?: string | null
  effectiveDateFrom?: string | null
  isAlert?: boolean
  recordStatus?: string
}
interface UpdateClaimNotes {
  id?: string
  claimId: string
  note: string
  effectiveDateTo?: string | null
  effectiveDateFrom?: string | null
  isAlert?: boolean
  recordStatus?: string
}

interface ClaimAddApiRequest {
  id?: string
  recordStatus?: string
  practiceId?: string
  appointmentId?: number
  claimNumber?: string
  locationId: string
  billingLocationId: string
  renderingProviderId?: number | null
  patientAccountNumber: string
  patientName: string
  patientDateOfBirth: string
  patientGender: string
  placeOfService: string
  patientId?: number
  dateOfServiceFrom?: string
  dateOfServiceTo?: string
  claimType?: string
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
  patientPaid?: number
  totalWriteOff?: number
  claimStatusCode?: string
  submissionBatchId?: string
  primaryPatientInsurancePolicyId?: string
  secondaryPatientInsurancePolicyId?: string
  tertiaryPatientInsurancePolicyId?: string
  updatedByName?: string
  claimDiagnosis: ClaimDiagnosis[]
  claimServiceLines: ClaimAddServiceLine[]
}
interface ClaimAddServiceLine {
  recordStatus?: string
  cptCode?: string
  cptDescription?: string
  modifierCode1?: string
  modifierCode2?: string
  sequenceNo?: number
  dateOfServiceFrom?: string
  dateOfServiceTo?: string
  units?: number
  unitAmount?: number
  totalAmount?: number
  deletedReason?: string
}
interface ProfessionalClaimServiceLine
  extends Omit<ClaimAddServiceLine, 'dateOfServiceFrom' | 'dateOfServiceTo'> {
  dateOfServiceFrom?: DateValue
  dateOfServiceTo?: DateValue
}
export type {
  ProfessionalClaimServiceLine,
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
  ServiceMasterFeeScheduleResponse,
  ClaimSubmissionResponse,
  ClaimNotesResponse,
  AddClaimNotes,
  UpdateClaimNotes,
  ClaimNotesFilter,
  ClaimAddApiRequest,
  ClaimAddServiceLine,
}
