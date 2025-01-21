'use server'

import * as api from '@/api'
import { ServicePayload } from '../types'

const addServiceAction = async (
  payload: ServicePayload,
): Promise<api.ActionResult<Partial<ServicePayload>[]>> => {
  console.dir(payload, { depth: null })
  const response = await api.POST<Partial<ServicePayload>[]>(
    api.ADD_SERVICE_ENDPOINT(payload.locationId),
    payload,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return { state: 'success', data: response.data }
}
export { addServiceAction }
