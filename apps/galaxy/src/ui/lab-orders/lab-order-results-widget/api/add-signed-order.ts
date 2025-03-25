'use server'

import * as api from '@/api'
import { SignedOrderPayload } from '../types'
const addSingedOrderApi = async (payload: SignedOrderPayload): Promise<api.ActionResult<string>> => {
    const response = await api.POST<any>(api.ADD_SIGNED_LAB_ORDERS, payload) 
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

export { addSingedOrderApi }
