'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import type { PracticePlanAddress, PracticePlanAddressParams } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  recordStatuses: ['Active', 'Inactive'],
}
interface GetPracticePlanAddressParams {
  payload?: Partial<PracticePlanAddressParams>
  page?: number
  sort?: Sort
  pageSize?: number
}
const getPracticePlanAddressAction = async ({
  payload,
  page = 1,
  sort,
  pageSize,
}: GetPracticePlanAddressParams): Promise<
  api.ActionResult<PracticePlanAddress[]>
> => {
  const url = new URL(
    api.GET_PRACTICE_PLAN_ADDRESS(payload?.practicePlanId as string),
  )
  if (page && pageSize) {
    const offset = (page - 1) * pageSize
    url.searchParams.append('limit', String(pageSize))
    url.searchParams.append('offset', String(offset))
  }
  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<PracticePlanAddress[]>(`${url}`, {
    ...defaultPayload,
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
    total: Number(response.headers.get('psychplus-totalresourcecount')),
    data: response.data,
  }
}

export { getPracticePlanAddressAction }
