'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Insurance } from '@/features/billing/payments/types'

interface InsuranceParams {
  payerName: string
  insurancePlanId: string
  effectiveDate: string
  terminationDate: string
  memberId: string
  groupNumber: string
  isPatientPolicyHolder: boolean
  insurancePolicyPriority: string
  hasCardFrontImage: boolean
  hasCardBackImage: boolean
  policyHolderName?: {
    firstName: string
    lastName: string
  }
  policyHolderGender?: string
  policyHolderPriority?: string
  policyHolderDateOfBirth?: string
  policyHolderRelationship?: string
  policyHolderSocialSecurityNumber?: string
  verificationStatus?: string
  isActive: boolean
  id?: string
}

const addInsuranceAction = async (
  params: InsuranceParams,
): Promise<ActionResult<Insurance>> => {
  const result = await api.POST<Insurance>(
    `${API_URL}/api/patients/self/policies`,
    params,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: result.data,
  }
}

export { addInsuranceAction, type InsuranceParams }
