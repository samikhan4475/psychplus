'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { getAuthCookies } from '@/utils/auth'
import { INSURANCE_PLAN_LIST_PAGE_SIZE } from '../constants'
import {
  GetPlanListResponse,
  InsurancePlanItem,
  InsurancePlanListSearchParams,
} from '../types'

interface GetPlanListParams {
  payload?: Partial<InsurancePlanListSearchParams>
  page?: number
  sort?: Sort
}

const defaultPayLoad = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const getPlanListAction = async ({
  payload,
  page = 1,
  sort,
}: GetPlanListParams): Promise<api.ActionResult<GetPlanListResponse>> => {
  const offset = (page - 1) * INSURANCE_PLAN_LIST_PAGE_SIZE
  const authTokens = getAuthCookies()

  const url = new URL(
    api.GET_INSURANCE_PLAN_LIST_ENDPOINT(authTokens?.practiceId ?? ''),
  )
  url.searchParams.append('limit', String(INSURANCE_PLAN_LIST_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  const response = await api.POST<InsurancePlanItem[]>(`${url}`, {
    ...defaultPayLoad,
    ...payload,
    practiceId: authTokens?.practiceId,
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
      insurancePlanList: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getPlanListAction }
