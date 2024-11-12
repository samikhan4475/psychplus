'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import type {
  PatientStatementPayload,
  ResponseHistoryDetail,
  ResponseHistoryDetailListResponse,
} from '../types'

interface ResponseHistoryDetailListParams {
  batchId: string
  payload?: PatientStatementPayload
  sort?: Sort
}

const getResponseHistoryDetailListAction = async ({
  batchId,
  sort,
}: ResponseHistoryDetailListParams): Promise<
  api.ActionResult<ResponseHistoryDetailListResponse>
> => {
  const url = new URL(api.GET_RESPONSE_HISTORY_DETAIL_LIST_ENDPOINT(batchId))
  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<ResponseHistoryDetail[]>(`${url}`, {})

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      responseHistoryDetail: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getResponseHistoryDetailListAction }
