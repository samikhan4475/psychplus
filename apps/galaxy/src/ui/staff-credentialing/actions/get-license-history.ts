'use server'

import * as api from '@/api'
import { GetLicensesResponse } from '../types'

export interface GetLicenseHistoryParams {
  id: string
  historyCreatedFrom?: string | null
  historyCreatedTo?: string | null
}

const getLicenseHistoryAction = async (
  payload: GetLicenseHistoryParams,
): Promise<api.ActionResult<GetLicensesResponse[]>> => {
  const response = await api.POST<GetLicensesResponse[]>(
    api.GET_STAFF_LICENSE_HISTORY_ENDPOINT(payload.id),
    payload,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: response.data.length ? response.data : [],
  }
}

export { getLicenseHistoryAction }
