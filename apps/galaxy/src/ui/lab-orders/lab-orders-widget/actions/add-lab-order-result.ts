'use server'

import * as api from '@/api'
import { LabResult } from '@/types'

const addLabOrdersResultAction = async (
  payload: Partial<LabResult>,
  appointmentId: string,
  orderId: string,
): Promise<api.ActionResult<LabResult>> => {
  const response = await api.POST<LabResult>(
    api.ADD_LAB_ORDERS_RESULT_ENDPOINT(appointmentId, orderId),
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

export { addLabOrdersResultAction }
