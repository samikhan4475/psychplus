'use client'

import * as api from '@/api/api.client'
import { UPDATE_CHANNEL_MESSAGES_STATUS } from '@/api/endpoints'
import { Channel } from '../types'

const updateChannelAction = async (
  messageId: string,
  channelId: string,
  data: Partial<Channel>,
): Promise<api.ActionResult<Channel>> => {
  const response = await api.PUT<Channel>(
    UPDATE_CHANNEL_MESSAGES_STATUS(messageId, channelId),
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

export { updateChannelAction }
