'use server'

import * as api from '@/api'
import { PAGE_SIZE } from '../contants'
import { SchemaType } from '../schema'
import { SecureMessage } from '../types'

interface SearchSecureMessagesParams extends Partial<SchemaType> {
  page?: number
}

const getAllSecureMessagesAction = async ({
  page = 1,
  ...rest
}: SearchSecureMessagesParams): Promise<
  api.ActionResult<{
    messages: SecureMessage[]
    total: number
  }>
> => {
  const offset = (page - 1) * PAGE_SIZE
  const url = new URL(api.GET_SECURE_MESSAGES)
  url.searchParams.append('limit', String(PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  const response = await api.POST<SecureMessage[]>(url.toString(), rest)
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
