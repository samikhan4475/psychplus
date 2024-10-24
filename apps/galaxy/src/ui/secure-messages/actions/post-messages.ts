'use server'

import * as api from '@/api'
import { SecureMessage } from '../types'

const postSecureMessagesAction = async (
  data: Partial<SecureMessage>,
): Promise<api.ActionResult<SecureMessage>> => {
  const response = await api.POST<SecureMessage>(api.SEND_SECURE_MESSAGE, data)
  console.log(response, 'response')
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
