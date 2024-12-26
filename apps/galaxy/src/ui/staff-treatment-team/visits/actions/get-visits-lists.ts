'use server'

import * as api from '@/api'
import { VISITS_TABLE_PAGE_SIZE } from '../constant'
import { GetVisitListData, VisitListPayload, VisitsList } from '../types'

const getVisitsListAction = async (
  payload?: VisitListPayload,
  page = 1,
): Promise<api.ActionResult<GetVisitListData>> => {
  const offset = (page - 1) * VISITS_TABLE_PAGE_SIZE
  const url = new URL(api.GET_TREATMENT_TEAM_VISITS)
  url.searchParams.append('limit', String(VISITS_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))
  const result = await api.POST<VisitsList[]>(`${url}`, payload)

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: {
      visitsListData: result.data,
      total: Number(result.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getVisitsListAction }
