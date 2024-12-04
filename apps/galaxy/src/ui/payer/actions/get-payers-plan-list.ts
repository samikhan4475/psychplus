'use server'

import * as api from '@/api'
import {
  PayerPlanFilter,
  PayerPlanListResponse,
  PayerPlanResponse,
  Sort,
} from '@/types'
import { PAYER_PLANS_LIST_TABLE_PAGE_SIZE } from '../constants'

interface GetPayerPlansListParams {
  payload?: Partial<PayerPlanFilter>
  page?: number
  sort?: Sort
}

const getPayerPlanListAction = async ({
  payload,
  page = 1,
  sort,
}: GetPayerPlansListParams): Promise<
  api.ActionResult<PayerPlanListResponse>
> => {
  const offset = (page - 1) * PAYER_PLANS_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_PAYER_PLANS_LIST)
  url.searchParams.append('limit', String(PAYER_PLANS_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  const updatedPayload = {
    ...payload,
    isIncludePayer: true,
    recordStatuses: ['Active'],
    includeTest:true
  }
  const response = await api.POST<PayerPlanResponse[]>(`${url}`, {
    ...updatedPayload,
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
      payerplanslist: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getPayerPlanListAction }
