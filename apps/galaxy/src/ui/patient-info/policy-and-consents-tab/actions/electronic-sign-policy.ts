'use server'

import * as api from '@/api'
import { PatientConsent } from '@/types'

const electronicallySignPolicy = async (
  policy: Omit<PatientConsent, 'status'>,
): Promise<api.ActionResult<PatientConsent>> => {
  const response = await api.POST<PatientConsent>(
    api.ELECTRONICALLY_SIGN_POLICY_ENDPOINT(policy.patientId),
    {
      ...policy,
    },
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { electronicallySignPolicy }
