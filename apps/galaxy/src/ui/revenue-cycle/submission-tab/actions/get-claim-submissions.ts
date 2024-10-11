'use server'

import * as api from '@/api'
import { Claim, Sort } from '@/types'
import { GetClaimsListResponse } from '../../types'
import { SUBMISSION_TABLE_PAGE_SIZE } from '../constants'
import { SchemaType } from '../submission-filter-form'

interface SearchClaimParams extends Partial<SchemaType> {
  page?: number
  sort?: Sort
}
const getClaimsAction = async ({
  page = 1,
  sort,
  ...rest
}: SearchClaimParams): Promise<api.ActionResult<GetClaimsListResponse>> => {
  const offset = (page - 1) * SUBMISSION_TABLE_PAGE_SIZE
  const url = new URL(api.GET_CLAIMS_LIST_ENDPOINT)
  url.searchParams.append('limit', String(SUBMISSION_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))
  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  const result = await api.POST<Claim[]>(url.toString(), rest)
  const total = Number(result.headers.get('psychplus-totalresourcecount'))
  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: {
      claims: result.data,
      total: total,
    },
  }
}
export { getClaimsAction }
