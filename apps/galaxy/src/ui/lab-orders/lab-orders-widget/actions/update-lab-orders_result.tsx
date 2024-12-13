'use server'

import * as api from '@/api'
import { LabResult, LabResultPayload } from '@/types'

const updateLabOrdersResultAction = async (
  payload: Partial<LabResultPayload>,
  appointmentId: string,
  orderId: string,
  id: string,
): Promise<api.ActionResult<LabResult>> => {
  const response = await api.PUT<LabResult>(
    api.UPDATE_LAB_ORDERS_RESULT_ENDPOINT(appointmentId, orderId, id),
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
    data: response.data,
  }
}

export { updateLabOrdersResultAction }
