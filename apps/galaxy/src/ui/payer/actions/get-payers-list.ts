'use server'

import * as api from '@/api'
import { PayerFilter, PayerListResponse, PayerResponse, Sort } from '@/types'

interface GetPayersListParams {
  payload?: Partial<PayerFilter>
  page?: number
  sort?: Sort
}

const PAYERS_LIST_TABLE_PAGE_SIZE = 20

const getPayersListAction = async ({
  payload,
  page = 1,
  sort,
}: GetPayersListParams): Promise<api.ActionResult<PayerListResponse>> => {
  const offset = (page - 1) * PAYERS_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.PAYERS_SEARCH_ENDPOINT)
  url.searchParams.set('limit', String(PAYERS_LIST_TABLE_PAGE_SIZE))
  url.searchParams.set('offset', String(offset))

  if (sort) {
    url.searchParams.set('orderBy', `${sort.column} ${sort.direction}`)
  }

  const requestPayload = {
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
    ...payload,
  }

  const response = await api.POST<PayerResponse[]>(
    url.toString(),
    requestPayload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      payers: response.data,
      total:
        Number(response.headers.get('psychplus-totalresourcecount')) ||
        response.data.length,
    },
  }
}

export { getPayersListAction }
