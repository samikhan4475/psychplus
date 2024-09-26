'use server'

import * as api from '@/api'
import type {
  BillingHistory,
  BillingHistoryParams,
  GetBillingHistoryData,
} from '../types'

const getPatientBillingHistoryAction = async (
  patientId: string,
  payload: BillingHistoryParams = {},
): Promise<api.ActionResult<GetBillingHistoryData>> => {
  const response = await api.POST<BillingHistory[]>(
    api.GET_PATIENT_BILLING_HISTORY(patientId),
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
    data: {
      billingHistories: response.data,
    },
  }
}

export { getPatientBillingHistoryAction }
