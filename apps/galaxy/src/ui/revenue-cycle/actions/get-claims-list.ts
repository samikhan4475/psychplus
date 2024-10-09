'use server'

import * as api from '@/api'
import { Claim, Sort } from '@/types'
import { CLAIM_LIST_TABLE_PAGE_SIZE } from '../constants'
import type { ClaimListSearchParams, GetClaimsListResponse } from '../types'

interface GetClaimsListParams {
  payload?: ClaimListSearchParams
  page?: number
  sort?: Sort
}

const defaultPayLoad = {
  isIncludePatientInsurancePlan: false,
  isIncludePatientInsurancePolicy: true,
  isIncludeClaimValidation: true,
}

const getClaimsListAction = async ({
  payload,
  page = 1,
  sort,
}: GetClaimsListParams): Promise<api.ActionResult<GetClaimsListResponse>> => {
  const offset = (page - 1) * CLAIM_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_CLAIMS_LIST_ENDPOINT)
  url.searchParams.append('limit', String(CLAIM_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<Claim[]>(`${url}`, {
    ...defaultPayLoad,
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
      claims: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getClaimsListAction }
