'use client'

import * as api from '@/api/api.client'
import { CREATE_CHANNEL_SECURE_MESSAGE } from '@/api/endpoints'
import { Channel } from '../types'

const createChannelsAction = async (
  messageId: string,
  data: Partial<Channel>[],
): Promise<api.ActionResult<Channel>> => {
  const response = await api.POST(
    CREATE_CHANNEL_SECURE_MESSAGE(messageId),
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

export { createChannelsAction }
