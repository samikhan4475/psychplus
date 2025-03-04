'use server'

import * as api from '@/api'
import { ForwardingMessage } from '../types'

const getForwardingStatusHistory = async (
  userId: number,
  messageForwardingId: string,
): Promise<api.ActionResult<ForwardingMessage[]>> => {
  const response = await api.POST<ForwardingMessage[]>(
    api.HISTORY_FORWARDING_MESSAGE_ENDPOINT(userId, messageForwardingId),
    {},
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

export { getForwardingStatusHistory }
