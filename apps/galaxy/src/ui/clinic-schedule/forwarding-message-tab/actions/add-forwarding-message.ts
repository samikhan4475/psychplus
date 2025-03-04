'use server'

import * as api from '@/api'
import { ForwardingMessage } from '../types'

const addForwardingMessageAction = async (
  userId: number,
  body: Partial<ForwardingMessage>,
): Promise<api.ActionResult<ForwardingMessage>> => {
  const response = await api.POST<ForwardingMessage>(
    api.ADD_FORWARD_MESSAGE_ENDPOINT(userId),
    body,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { addForwardingMessageAction }
