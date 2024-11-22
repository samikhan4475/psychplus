'use server'

import * as api from '@/api'
import { Channel } from '../types'

const updateChannelAction = async (
  messageId: string,
  channelId: string,
  data: Partial<Channel>,
): Promise<api.ActionResult<Channel>> => {
  const response = await api.PUT<Channel>(
    api.UPDATE_CHANNEL_MESSAGES_STATUS(messageId, channelId),
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
