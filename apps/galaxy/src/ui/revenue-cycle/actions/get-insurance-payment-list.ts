'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { INSURANCE_PAYMENT_LIST_TABLE_PAGE_SIZE } from '../constants'
import { insurancePaymentRecordStatuses } from '../enums'
import type {
  ClaimListSearchParams,
  GetInsurancePaymentListResponse,
  InsurancePayment,
} from '../types'

interface GetClaimsListParams {
  payload?: ClaimListSearchParams
  page?: number
  sort?: Sort
}

const defaultPayLoad = {
  recordStatuses: [insurancePaymentRecordStatuses.ACTIVE],
}

const getInsurancePaymentListAction = async ({
  payload,
  page = 1,
  sort,
}: GetClaimsListParams): Promise<
  api.ActionResult<GetInsurancePaymentListResponse>
> => {
  const offset = (page - 1) * INSURANCE_PAYMENT_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_INSURANCE_PAYMENT_LIST_ENDPOINT)
  url.searchParams.append(
    'limit',
    String(INSURANCE_PAYMENT_LIST_TABLE_PAGE_SIZE),
  )
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<InsurancePayment[]>(`${url}`, {
    ...defaultPayLoad,
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
    data: {
      insurancePayments: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getInsurancePaymentListAction }
