'use client'

import * as api from '@/api/api.client'
import { GET_SECURE_MESSAGES } from '@/api/endpoints'
import { PAGE_SIZE } from '../contants'
import { SchemaType } from '../schema'
import { SecureMessage } from '../types'

interface SearchSecureMessagesParams extends Omit<SchemaType, 'from' | 'to'> {
  page?: number
  from: string | undefined | null
  to: string | undefined | null
}

const getAllSecureMessagesAction = async (
  { page = 1, ...rest }: SearchSecureMessagesParams,
  options?: { signal?: AbortSignal },
): Promise<
  api.ActionResult<{
    messages: SecureMessage[]
    total: number
  }>
> => {
  const offset = (page - 1) * PAGE_SIZE

  let url = `${GET_SECURE_MESSAGES}?limit=${PAGE_SIZE}&offset=${offset}`
  if (['Inbox', 'Archived'].includes(rest.messageStatus as string)) {
    url += `&orderBy=lastMessageDate desc`
  }
  const response = await api.POST<SecureMessage[]>(url, rest, options)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  const total = Number(response.headers.get('psychplus-totalresourcecount'))
  return {
    state: 'success',
    data: {
      messages: response.data,
      total,
    },
  }
}

export { getAllSecureMessagesAction }
