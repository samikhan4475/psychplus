'use server'

import * as api from '@/api'

const deleteLabOrderResultAction = async (
  appointmentId: string,
  orderId: string,
  id: string,
): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(
    api.DELETE_LAB_ORDERS_RESULT_ENDPOINT(appointmentId, orderId, id),
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

export { deleteLabOrderResultAction }
