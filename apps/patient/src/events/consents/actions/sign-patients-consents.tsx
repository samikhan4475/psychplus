'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { PolicyType } from '@psychplus-v2/types'

export interface SignPatientsConsentsParams {
  policyType: PolicyType
  referenceId: string
  signatureName: string
}

const signPatientsConsents = async ({
  policyType,
  referenceId,
  signatureName,
}: SignPatientsConsentsParams) => {
  const result = await api.POST(
    `${API_URL}/api/patients/self/consents/actions/types/${policyType}/sign/anonymous/${referenceId}`,
    { signatureName },
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
  }
}

export { signPatientsConsents }
