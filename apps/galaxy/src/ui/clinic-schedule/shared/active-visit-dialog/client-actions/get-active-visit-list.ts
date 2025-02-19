'use client'

import * as api from '@/api/api.client'
import { SEARCH_BOOKED_APPOINTMENTS_ENDPOINT } from '@/api/endpoints'
import { Appointment } from '@/types'
import { VACATION_LIST_TABLE_PAGE_SIZE } from '../constant'
import { GetActiveVisitListParams } from '../types'

const defaultPayload = {
  includePatientData: true,
  includeFinancialData: true,
  includeLocation: true,
  includeStaff: true,
  includeSpecialist: true,
  includeEncounterTypes: true,
  includeServiceUnit: true,
  includeServiceGroup: true,
  includeCptCodes: true,
  includePatientNotes: true,
}
const getActiveVisitList = async ({
  payload,
  page = 1,
}: GetActiveVisitListParams): Promise<api.ActionResult<Appointment[]>> => {
  let url = SEARCH_BOOKED_APPOINTMENTS_ENDPOINT
  if (page) {
    const pageSize = VACATION_LIST_TABLE_PAGE_SIZE ?? 20
    const offset = (page - 1) * pageSize
    url += `?limit=${pageSize}&offset=${offset}`
  }
  const response = await api.POST<Appointment[]>(url, {
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
    data: response.data,
    total: Number(response.headers.get('psychplus-totalresourcecount')),
  }
}

export { getActiveVisitList }
