'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { MASTER_FEE_SCHEDULE_TABLE_PAGE_SIZE } from '../constants'
import type { CPT, CptListResponse, MasterFeeScheduleFilter } from '../types'

interface CptSearchParams {
  payload?: Partial<MasterFeeScheduleFilter>
  page: number
  sort?: Sort
}
const getCptListAction = async ({
  payload,
  page = 1,
  sort,
}: CptSearchParams): Promise<api.ActionResult<CptListResponse>> => {
  const offset = (page - 1) * MASTER_FEE_SCHEDULE_TABLE_PAGE_SIZE

  const url = new URL(api.GET_MASTER_FEE_SCHEDULES)
  url.searchParams.append('limit', String(MASTER_FEE_SCHEDULE_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  const response = await api.POST<CPT[]>(`${url}`, {
    ...payload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const total = Number(response.headers.get('psychplus-totalresourcecount'))
  return {
    state: 'success',
    data: {
      cptList: response.data,
      total,
    },
  }
}

export { getCptListAction }
