'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { DENIAL_TABLE_PAGE_SIZE } from '../constants'
import type {
  DenialListPayload,
  DenialListResponse,
  DenialServiceLine,
} from '../types'

interface DenialListParams {
  payload?: Partial<DenialListPayload>
  page?: number
  sort?: Sort
}

const getDenialListAction = async ({
  payload,
  page = 1,
  sort,
}: DenialListParams): Promise<api.ActionResult<DenialListResponse>> => {
  const offset = (page - 1) * DENIAL_TABLE_PAGE_SIZE

  const url = new URL(api.GET_DENIAL_LIST_ENDPOINT)
  url.searchParams.append('limit', String(DENIAL_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<DenialServiceLine[]>(`${url}`, payload)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      denialList: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getDenialListAction }
