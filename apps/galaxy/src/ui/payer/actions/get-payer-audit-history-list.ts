'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import type { PayerAuditHistory, PayerAuditHistoryPayload } from '../types'

interface GetPayerAuditHistoryListParams {
  payload?: PayerAuditHistoryPayload
  sort?: Sort
}

const getPayerAuditHistoryListAction = async ({
  payload,
  sort,
}: GetPayerAuditHistoryListParams): Promise<
  api.ActionResult<PayerAuditHistory[]>
> => {
  const url = new URL(api.PAYERS_HISTORY_SEARCH_ENDPOINT)

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const defaultPayload = {
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
  }

  const requestPayload = {
    ...defaultPayload,
    ...payload,
  }

  const response = await api.POST<PayerAuditHistory[]>(`${url}`, requestPayload)

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

export { getPayerAuditHistoryListAction }
