'use server'

import * as api from '@/api'
import { SecureMessage } from '../types'

const createForwardMessageAction = async (
  messageId: string,
): Promise<api.ActionResult<SecureMessage>> => {
  const response = await api.POST<SecureMessage>(
    api.CREATE_FORWARD_SECURE_MESSAGE(messageId),
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

export { createForwardMessageAction }
