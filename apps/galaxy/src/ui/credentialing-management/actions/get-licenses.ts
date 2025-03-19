'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { PAGE_SIZE_LIMIT } from '../constants'
import {
  Filters,
  GetLicensesActionResponse,
  GetLicensesResponse,
} from '../types'

interface SearchParams {
  payload?: Partial<Filters>
  page: number
  sort?: Sort
}

const getLicensesAction = async ({
  payload,
  page = 1,
  sort,
}: SearchParams): Promise<api.ActionResult<GetLicensesActionResponse>> => {
  const offset = (page - 1) * PAGE_SIZE_LIMIT

  const url = new URL(api.GET_STAFF_LICENSE)
  url.searchParams.append('limit', String(PAGE_SIZE_LIMIT))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  const response = await api.POST<GetLicensesResponse>(url.toString(), payload)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: {
      licenses: response.data.length ? response.data : [],
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getLicensesAction }
