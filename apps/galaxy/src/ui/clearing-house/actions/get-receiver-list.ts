'use server'

import * as api from '@/api'
import { ClearingHouseReceiver, Sort } from '@/types'
import { RECEIVER_LIST_TABLE_PAGE_SIZE } from '../constants'
import type { GetReceiverListResponse } from '../types'

interface GetClaimsListParams {
  payload?: Partial<ClearingHouseReceiver>
  page?: number
  sort?: Sort
}

const getReceiverListAction = async ({
  payload,
  page = 1,
  sort,
}: GetClaimsListParams): Promise<api.ActionResult<GetReceiverListResponse>> => {
  const offset = (page - 1) * RECEIVER_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_CLEARING_HOUSE_RECEIVER_LIST_ENDPOINT)
  url.searchParams.append('limit', String(RECEIVER_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<ClearingHouseReceiver[]>(`${url}`, {
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
    data: {
      receivers: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getReceiverListAction }
