'use server'

import * as api from '@/api'
import { Service } from '@/types'

const getServiceHistoryAction = async (
  serviceId: string,
): Promise<api.ActionResult<Service[]>> => {
  const response = await api.POST<Service[]>(
    api.GET_SERVICE_HISTORY(serviceId),
    {},
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return { state: 'success', data: response.data }
}
export { getServiceHistoryAction }
