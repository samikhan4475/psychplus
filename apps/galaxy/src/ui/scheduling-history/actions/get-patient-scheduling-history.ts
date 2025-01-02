'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { SCHEDULING_HISTORY_LIST_TABLE_PAGE_SIZE } from '../constants'
import type {
  GetSchedulingHistoryListResponse,
  SchedulingHistoryData,
  SchedulingHistoryPayload,
} from '../types'

interface GetSchedulingListParams {
  patientId: string
  payload?: Partial<SchedulingHistoryPayload>
  page?: number
  sort?: Sort
}
const getPatientSchedulingHistoryAction = async ({
  patientId,
  payload,
  sort,
  page = 1,
}: GetSchedulingListParams): Promise<
  api.ActionResult<GetSchedulingHistoryListResponse>
> => {
  const offset = (page - 1) * SCHEDULING_HISTORY_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_PATIENT_SCHEDULING_HISTORY(patientId))
  if (sort) {
    url.searchParams.append('orderBy', `${sort?.column} ${sort?.direction}`)
  }
  url.searchParams.append(
    'limit',
    String(SCHEDULING_HISTORY_LIST_TABLE_PAGE_SIZE),
  )
  url.searchParams.append('offset', String(offset))
  const response = await api.POST<SchedulingHistoryData[]>(`${url}`, payload)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      list: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getPatientSchedulingHistoryAction }
