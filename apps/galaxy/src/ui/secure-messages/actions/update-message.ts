'use server'

import * as api from '@/api'
import { SecureMessage } from '../types'

const updateMessageAction = async (
  messageId: string,
  data: Partial<SecureMessage>,
): Promise<api.ActionResult<SecureMessage>> => {
  const response = await api.PUT<SecureMessage>(
    api.UPDATE_MESSAGE(messageId),
    data,
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

export { updateMessageAction }
