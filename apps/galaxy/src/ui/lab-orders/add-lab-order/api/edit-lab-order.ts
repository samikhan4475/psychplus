'use server'

import * as api from '@/api'
import { LabOrders } from '@/types'

const editLabOrderApi = async (
  orderId: string,
  payload: LabOrders,
): Promise<api.ActionResult<LabOrders>> => {
  const response = await api.PUT<LabOrders>(
    `${api.LAB_ORDER(Number(payload.appointmentId))}/${orderId}`,
    {
      ...payload,
    },
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

export { editLabOrderApi }
