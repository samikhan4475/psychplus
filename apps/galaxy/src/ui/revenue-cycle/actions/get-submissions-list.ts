'use server'

import * as api from '@/api'
import { Claim, InsurancePolicyPriority, Sort } from '@/types'
import { SUBMISSION_LIST_TABLE_PAGE_SIZE } from '../constants'
import type { ClaimListSearchParams, GetSubmissionResponse } from '../types'

interface GetClaimsListParams {
  payload?: ClaimListSearchParams
  page?: number
  sort?: Sort
}

const defaultPayLoad = {
  isIncludePatientInsurancePolicy: true,
  isIncludeClaimValidation: true,
  insurancePolicyPriority: InsurancePolicyPriority.Primary,
  isIncludePatientInsurancePlan: false,
}

const getSubmissionListAction = async ({
  payload,
  page = 1,
  sort,
}: GetClaimsListParams): Promise<api.ActionResult<GetSubmissionResponse>> => {
  const offset = (page - 1) * SUBMISSION_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_CLAIM_SUBMISSION_LIST)
  url.searchParams.append('limit', String(SUBMISSION_LIST_TABLE_PAGE_SIZE))
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
      submissions: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getSubmissionListAction }
