'use server'

import * as api from '@/api'
import type { CredentialingManager } from '../types'

const updateCredentialingManagerAction = async (
  practiceId: string,
  managerId: string,
  payload: Partial<CredentialingManager>,
): Promise<api.ActionResult<CredentialingManager>> => {
  const response = await api.PUT<CredentialingManager>(
    api.UPDATE_PRACTICES_LICENSE_MANAGERS_ENDPOINT(practiceId, managerId),
    payload,
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

export { updateCredentialingManagerAction }
