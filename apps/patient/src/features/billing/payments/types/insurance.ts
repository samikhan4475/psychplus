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
  }
  policyHolderDateOfBirth?: string
  policyHolderSocialSecurityNumber?: string
  policyHolderGender?: string
  policyName: string
  payerName: string
}

export type { InsurancePayer, InsurancePlan, Insurance }
