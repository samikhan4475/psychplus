'use server'

import * as api from '@/api'
import { ForwardingMessage } from '../types'

const deleteForwardingMessageAction = async (
  userId: number,
  forwardingMessageId: string,
): Promise<api.ActionResult<ForwardingMessage>> => {
  const response = await api.DELETE<ForwardingMessage>(
    api.DELETE_FORWARDING_MESSAGE_ENDPOINT(userId, forwardingMessageId),
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { deleteForwardingMessageAction }
