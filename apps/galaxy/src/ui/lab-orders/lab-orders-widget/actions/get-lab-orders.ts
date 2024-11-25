'use server'

import * as api from '@/api'
import { LabOrders } from '@/types'
import { LabOrderPayload } from '../types'

interface GetLabOrdersActionProps {
  appointmentId: string
  payload?: LabOrderPayload
}

const getLabOrdersAction = async ({
  appointmentId,
  payload,
}: GetLabOrdersActionProps): Promise<api.ActionResult<LabOrders[]>> => {
  const response = await api.POST<LabOrders[]>(
    api.GET_LAB_ORDERS(appointmentId),
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

export { getLabOrdersAction }
