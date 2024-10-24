'use server'

import * as api from '@/api'
import { Channel } from '../types'

const postChannelAction = async (
  messageId: string,
  data: Partial<Channel>,
): Promise<api.ActionResult<Channel>> => {
  const response = await api.POST(
    api.CREATE_CHANNEL_SECURE_MESSAGE(messageId),
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
    data: response.data as Channel,
  }
}

export { postChannelAction }
