'use server'

import * as api from '@/api'
import { AddPayer } from '@/types'

const addPayerAction = async (
  payload: Partial<AddPayer>,
): Promise<api.ActionResult<AddPayer>> => {
  const response = await api.POST<AddPayer>(api.ADD_PAYER(), payload)

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

export { addPayerAction }
