'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { RESPONSE_HISTORY_TABLE_PAGE_SIZE } from '../constants'
import type {
  ResponseHistoryListResponse,
  ResponseHistoryPayload,
  ResponseHistoryRecord,
} from '../types'

interface ResponseHistoryListParams {
  payload?: ResponseHistoryPayload
  page?: number
  sort?: Sort
}

const defaultPayLoad = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const getResponseHistoryListAction = async ({
  payload,
  page = 1,
  sort,
}: ResponseHistoryListParams): Promise<
  api.ActionResult<ResponseHistoryListResponse>
> => {
  const offset = (page - 1) * RESPONSE_HISTORY_TABLE_PAGE_SIZE

  let url = new URL(api.GET_RESPONSE_HISTORY_LIST_ENDPOINT)
  url.searchParams.append('limit', String(RESPONSE_HISTORY_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const reqPayload = {
    ...defaultPayLoad,
    ...payload,
  }

  const response = await api.POST<ResponseHistoryRecord[]>(`${url}`, reqPayload)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      responseHistory: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getResponseHistoryListAction }
