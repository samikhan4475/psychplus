'use client'

import * as api from '@/api/api.client'
import { GET_CHANNEL_SECURE_MESSAGE } from '@/api/endpoints'
import { PAGE_SIZE } from '../contants'
import { Channel } from '../types'

const getAllChannelsAgainstMessageIdAction = async (
  messageId: string,
  page = 1,
): Promise<api.ActionResult<Channel[]>> => {
  const offset = (page - 1) * PAGE_SIZE

  const response = await api.GET<Channel[]>(
    `${GET_CHANNEL_SECURE_MESSAGE(
      messageId,
    )}?limit=${PAGE_SIZE}&offset=${offset}`,
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

export { getAllChannelsAgainstMessageIdAction }
