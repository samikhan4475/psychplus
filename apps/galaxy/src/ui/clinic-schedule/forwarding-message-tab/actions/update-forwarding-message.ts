'use server'

import * as api from '@/api'
import { ForwardingMessage } from '../types'

const updateForwardingMessageAction = async (
  userId: number,
  forwardingMessageId: string,
  payload: Partial<ForwardingMessage>,
): Promise<api.ActionResult<ForwardingMessage>> => {
  const response = await api.PUT<ForwardingMessage>(
    api.UPDATE_FORWARDING_MESSAGE_ENDPOINT(userId, forwardingMessageId),
    payload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { updateForwardingMessageAction }
