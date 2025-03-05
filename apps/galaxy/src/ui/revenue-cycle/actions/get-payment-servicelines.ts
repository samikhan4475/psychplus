'use server'

import * as api from '@/api'
import { ClaimServiceLinePayment } from '../types'

interface GetPaymentServiceLinesParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  recordStatuses?: string[]
  claimPaymentId?: string
  claimNumber?: string
  processedAsCode: string
}
const defaultPayLoad = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const getPaymentServiceLinesAction = async (
  payload: GetPaymentServiceLinesParams,
): Promise<api.ActionResult<ClaimServiceLinePayment[]>> => {
  const url = new URL(api.GET_PAYMENT_SERVICELINES_ENDPOINT)

  const response = await api.POST<ClaimServiceLinePayment[]>(`${url}`, {
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
    data: response.data,
  }
}

export { getPaymentServiceLinesAction }
