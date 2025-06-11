'use server'

import * as api from '@/api'

const rxCancleRequestAction = async (
  pharmacyNotificationId: string,
  pharmacyNotificationResponseId: string,
): Promise<api.ActionResult<void>> => {
  const result = await api.POST(
    api.PHARMACY_CANCEL_REQUEST(
      pharmacyNotificationId,
      pharmacyNotificationResponseId,
    ),
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

export { rxCancleRequestAction }
