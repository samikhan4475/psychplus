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
    middleName: string
  }
  policyHolderDateOfBirth?: string
  policyHolderSocialSecurityNumber?: string
  policyHolderGender?: string
  policyHolderPriority?: string
  policyName: string
  payerName: string
  policyPriority: string
}

interface InsuranceTag {
  id: string
  name: string
  isActive: boolean
  isTest: boolean
  isPublicViewable: boolean
  payerType: string
}

enum InsuranceChipVariantType {
  Pending = 'warning',
  Unverified = 'danger',
  Verified = 'success',
}

export {
  type InsurancePayer,
  type InsurancePlan,
  type Insurance,
  type InsuranceTag,
  InsuranceChipVariantType,
}
