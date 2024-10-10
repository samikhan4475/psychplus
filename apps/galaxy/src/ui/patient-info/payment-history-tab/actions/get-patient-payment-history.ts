'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { PATIENT_PAYMENT_HX_TABLE_PAGE_SIZE } from '../constants'
import type {
  GetPatientPaymentHistoryParams,
  GetPaymentHistorysData,
  PaymentHistory,
} from '../types'

interface SearchPaymentHistoryParams extends GetPatientPaymentHistoryParams {
  page?: number
  sort?: Sort
}

const getPatientPaymentHistoryAction = async ({
  page = 1,
  sort,
  ...rest
}: Partial<SearchPaymentHistoryParams>): Promise<
  api.ActionResult<GetPaymentHistorysData>
> => {
  const offset = (page - 1) * PATIENT_PAYMENT_HX_TABLE_PAGE_SIZE

  const url = new URL(api.GET_PATIENT_PAYMENT_HISTORY)
  url.searchParams.append('limit', String(PATIENT_PAYMENT_HX_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))
  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  const response = await api.POST<PaymentHistory>(url.toString(), rest)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  const total = Number(response.headers.get('psychplus-totalresourcecount'))

  return {
    state: 'success',
    data: {
      paymentHistory: response.data,
      total,
    },
  }
}

export { getPatientPaymentHistoryAction }
