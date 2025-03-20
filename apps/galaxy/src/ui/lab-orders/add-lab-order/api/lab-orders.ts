'use server'

import * as api from '@/api'
import { LabOrders } from '@/types'

const addLabOrderApi = async (
  payload: LabOrders,
): Promise<api.ActionResult<LabOrders>> => {
  const response = await api.POST<LabOrders>(
    api.LAB_ORDER(Number(payload.appointmentId)),
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

export { addLabOrderApi }
