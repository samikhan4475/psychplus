'use server'

import * as api from '@/api'
import { RenewalResponsePayload } from '../types'

const rxRenewalAction = async (
  pharmacyNotificationId: string,
  payload: RenewalResponsePayload,
): Promise<api.ActionResult<void>> => {
  const result = await api.POST(
    api.UPDATE_PHARMACY_NOTIFICATIONS(pharmacyNotificationId),
    payload,
  )
  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { rxRenewalAction }