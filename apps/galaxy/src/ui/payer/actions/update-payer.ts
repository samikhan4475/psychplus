'use server'

import * as api from '@/api'
import { UpdatePayer } from '@/types'

const updatePayerAction = async (
  payerId: string,
  payload: Partial<UpdatePayer>,
): Promise<api.ActionResult<UpdatePayer>> => {
  const response = await api.PUT<UpdatePayer>(
    api.UPDATE_PAYER(payerId),
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

export { updatePayerAction }
