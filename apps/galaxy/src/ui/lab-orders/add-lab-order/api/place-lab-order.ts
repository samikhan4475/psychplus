'use server'

import * as api from '@/api'

const placeLabOrderApi = async (
  orderId: string,
): Promise<api.ActionResult<void>> => {
  const response = await api.POST<void>(api.PLACE_LAB_ORDER(orderId), {})
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

export { placeLabOrderApi }
