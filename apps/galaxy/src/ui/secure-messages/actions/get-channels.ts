'use server'

import * as api from '@/api'
import { PAGE_SIZE } from '../contants'
import { Channel } from '../types'

const getAllChannelsAgainstMessageIdAction = async (
  messageId: string,
  page = 1,
): Promise<api.ActionResult<Channel[]>> => {
  const offset = (page - 1) * PAGE_SIZE

  const url = new URL(api.GET_CHANNEL_SECURE_MESSAGE(messageId))
  url.searchParams.append('limit', String(PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  const response = await api.GET<Channel[]>(url.toString())
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
