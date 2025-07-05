'use client'

import * as api from '@/api/api.client'
import { SEND_SECURE_MESSAGE } from '@/api/endpoints'
import { SecureMessage } from '../types'

const postSecureMessagesAction = async (
  data: Partial<SecureMessage>,
): Promise<api.ActionResult<SecureMessage>> => {
  const response = await api.POST<SecureMessage>(SEND_SECURE_MESSAGE, data)
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

export { postSecureMessagesAction }
