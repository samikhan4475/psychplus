'use server'

import * as api from '@/api'
import { GetLicensesHistoryResponse } from '../types'

export interface GetLicenseHistoryParams {
  id: string
  historyCreatedFrom?: string | null
  historyCreatedTo?: string | null
}

const getLicenseHistoryAction = async (
  payload: GetLicenseHistoryParams,
): Promise<api.ActionResult<GetLicensesHistoryResponse>> => {
  const response = await api.POST<GetLicensesHistoryResponse[]>(
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
    data: response.data?.[0]
      ? response.data[0]
      : {
          licenses: [],
          legalName: {
            firstName: '',
            lastName: '',
          },
          staffId: 0,
          userId: 0,
        },
  }
}

export { getLicenseHistoryAction }
