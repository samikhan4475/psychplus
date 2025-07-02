import { PatientAddress } from './address'
import { Metadata } from './metadata'

enum InsurancePolicyPriority {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Tertiary = 'Tertiary',
  Other = 'Other',
}
interface InsurancePayer {
  id: string
  name: string
  plans?: InsurancePlan[]
}

interface InsurancePlan {
  id: string
  name: string
  isActive: boolean
  isTest: boolean
  isPublicViewable: boolean
  payerType: string
}

interface Insurance {
  id: string
  insurancePlanId: string
  verificationStatus: string
  isActive: boolean
  memberId: string
  groupNumber: string
  effectiveDate: string
  terminationDate: string
  insurancePolicyPriority: string
  hasCardFrontImage: boolean
  hasCardBackImage: boolean
  isPatientPolicyHolder: boolean
  policyHolderRelationship?: string
  policyHolderName?: {
    firstName: string
    lastName: string
    middleName?: string
  }
  policyHolderDateOfBirth?: string
  policyHolderSocialSecurityNumber?: string
  policyHolderGender?: string
  policyHolderPriority?: string
  policyName: string
  payerName: string
  isDeleted?: boolean
  policyHolderStreetAddress?: string
  policyHolderStreetAddress2?: string
  policyHolderCity?: string
  policyHolderState?: string
  policyHolderPostalCode?: string
  policyHolderPostalPlus4Code?: string
  contactInfo?: {
    addresses: PatientAddress[]
  }
}

interface PatientInsuranceInfo {
  id: string
  metadata: Metadata
  patientId: number
  isSelfPay: boolean
  policies: Insurance[]
}
interface RawInsurance extends Insurance {
  metadata: Metadata & { createdByFullName: string }
}
export {
  InsurancePolicyPriority,
  type InsurancePayer,
  type Insurance,
  type RawInsurance,
  type PatientInsuranceInfo,
}
