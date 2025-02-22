'use server'

import * as api from '@/api'
import { LabOrders } from '@/types'

const deleteLabOrderApi = async (
  orderId: string,
  appointmentId: number,
): Promise<api.ActionResult<LabOrders>> => {
  const response = await api.DELETE<LabOrders>(
    `${api.LAB_ORDER(appointmentId)}/${orderId}`,
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

export { deleteLabOrderApi }
