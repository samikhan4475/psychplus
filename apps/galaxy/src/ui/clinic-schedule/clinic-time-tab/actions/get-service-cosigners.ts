'use server'

import * as api from '@/api'
import { Cosigner } from '@/types'

interface Payload {
  locationServiceIds?: string[]
  locationIds?: string[]
}

const getServiceCosigners = async (
  payload: Payload,
): Promise<api.ActionResult<Cosigner[]>> => {
  const response = await api.POST<Cosigner[]>(api.GET_SERVICES_COSIGNERS, {
    ...payload,
  })

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

export { getServiceCosigners }
