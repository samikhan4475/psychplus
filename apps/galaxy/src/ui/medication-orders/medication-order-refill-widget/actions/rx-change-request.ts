'use server'

import * as api from '@/api'
import { ChangeRequestPayload } from '../types'

const rxChangeRequestAction = async (
  pharmacyNotificationId: string,
  payload: ChangeRequestPayload,
): Promise<api.ActionResult<void>> => {
  
  const result = await api.POST(
    api.PHARMACY_CHANGE_REQUEST(pharmacyNotificationId),
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

export { rxChangeRequestAction }
