'use server'

import * as api from '@/api'
import { PmpScoreRequest, PmpScoreResponse } from '../types'

interface SearchPMPActionParams {
  payload?: Partial<PmpScoreRequest>
}

const searchPMPAction = async ({
  payload,
}: SearchPMPActionParams): Promise<api.ActionResult<PmpScoreResponse[]>> => {
  const url = new URL(api.PMP_SEARCH(String(payload?.patientId)))
  url.searchParams.append('limit', String(0))
  url.searchParams.append('offset', String(0))

  const updatedPayload = {
    ...payload,
    isIncludePatient: true,
    isIncludeStaff: true,
    isIncludeAppointment: true,
    isIncludeLocation: true,
    isIncludePmpScores: true,
    recordStatuses: ['Active'],
  }
  const response = await api.POST<PmpScoreResponse[]>(`${url}`, {
    ...updatedPayload,
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
  }
}

export { searchPMPAction }
