'use server'

import * as api from '@/api'
import { Appointment } from '@/types'
import { VISITS_TABLE_PAGE_SIZE } from '../constant'
import { GetVisitListData, VisitListPayload } from '../types'

const defaultPayload = {
  includeEncounterTypes: true,
  includeLocation: true,
  includePatientData: true,
  includeStaff: true,
}

const getVisitsListAction = async (
  payload?: VisitListPayload,
  page = 1,
): Promise<api.ActionResult<GetVisitListData>> => {
  const offset = (page - 1) * VISITS_TABLE_PAGE_SIZE
  const url = new URL(api.SEARCH_BOOKED_APPOINTMENTS_ENDPOINT)
  url.searchParams.append('limit', String(VISITS_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))
  const result = await api.POST<Appointment[]>(url.toString(), {
    ...defaultPayload,
    ...payload,
  })

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
