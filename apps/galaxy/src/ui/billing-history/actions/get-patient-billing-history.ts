'use server'

import * as api from '@/api'
import { PATIENT_BILLING_HISTORY_TABLE_PAGE_SIZE } from '../constants'
import type {
  BillingHistory,
  BillingHistoryParams,
  GetBillingHistoryData,
} from '../types'

const getPatientBillingHistoryAction = async (
  payload: BillingHistoryParams,
  page = 1,
): Promise<api.ActionResult<GetBillingHistoryData>> => {
  const offset = (page - 1) * PATIENT_BILLING_HISTORY_TABLE_PAGE_SIZE
  const url = new URL(api.GET_PATIENT_BILLING_HISTORY(payload.patientId))
  url.searchParams.append(
    'limit',
    String(PATIENT_BILLING_HISTORY_TABLE_PAGE_SIZE),
  )
  url.searchParams.append('offset', String(offset))

  const response = await api.POST<BillingHistory[]>(url.toString(), payload)

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
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getPatientBillingHistoryAction }
