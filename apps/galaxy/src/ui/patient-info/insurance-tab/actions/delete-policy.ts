'use server'

import * as api from '@/api'

const deletePolicy = async (
  patienId: string,
  policyId: string,
): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(
    api.DELETE_PATIENT_POLICY_ENDPOINT(patienId, policyId),
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { deletePolicy }
