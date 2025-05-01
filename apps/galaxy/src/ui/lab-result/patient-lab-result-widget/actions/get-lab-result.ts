'use server'

import * as api from '@/api'
import { LabResultResponse, LabResultsPayload } from '../types'

const fetchLabResultsAction = async (
  payload: LabResultsPayload,
): Promise<api.ActionResult<LabResultResponse[]>> => {
  const defaultPayload = { isIncludeDnrResults: false }
  const finalPayload = { ...defaultPayload, ...payload }
  const endpoint = api.GET_LAB_RESULTS_ENDPOINT(finalPayload.patientId)
  const response = await api.POST<LabResultResponse[]>(endpoint, finalPayload)
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

export { fetchLabResultsAction }
