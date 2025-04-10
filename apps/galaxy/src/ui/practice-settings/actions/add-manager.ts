'use server'

import * as api from '@/api'
import type { CredentialingManager } from '../types'

const addCredentialingManagerAction = async (
  practiceId: string,
  payload: Partial<CredentialingManager>,
): Promise<api.ActionResult<CredentialingManager>> => {
  const response = await api.POST<CredentialingManager>(
    api.ADD_PRACTICES_LICENSE_MANAGERS_ENDPOINT(practiceId),
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

export { addCredentialingManagerAction }
