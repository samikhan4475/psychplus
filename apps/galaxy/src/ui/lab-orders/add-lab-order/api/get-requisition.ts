'use server'

import * as api from '@/api'

const getLabOrderRequisition = async (
  orderId: string,
): Promise<api.ActionResult<void>> => {
  const response = await api.POST<void>(
    api.LAB_ORDER_GET_REQUISITION(orderId),
    {},
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { getLabOrderRequisition }
