'use server'

import * as api from '@/api'
import { FORWARDING_MESSAGE_LIST_TABLE_PAGE_SIZE } from '../constant'
import { ForwardingMessage, GetForwardingMessageListPayload } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeRecipients: true,
  isIncludeUsers: true,
}

const getForwardingMessagesAction = async ({
  page,
  payload = {},
}: GetForwardingMessageListPayload): Promise<
  api.ActionResult<ForwardingMessage[]>
> => {
  const url = new URL(api.GET_FORWARDING_MESSAGE_LIST_ENDPOINT)
  if (page) {
    const offset = (page - 1) * FORWARDING_MESSAGE_LIST_TABLE_PAGE_SIZE
    url.searchParams.append(
      'limit',
      String(FORWARDING_MESSAGE_LIST_TABLE_PAGE_SIZE),
    )
    url.searchParams.append('offset', String(offset))
  }
  const response = await api.POST<ForwardingMessage[]>(url.toString(), {
    ...defaultPayload,
    ...payload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
    total: 20,
  }
}

export { getForwardingMessagesAction }
