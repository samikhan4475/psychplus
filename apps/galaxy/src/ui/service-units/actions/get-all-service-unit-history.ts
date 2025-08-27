'use server'

import * as api from '@/api'
import type { ServiceUnit } from '../types'

const getAllServiceUnitHistoryAction = async (
  locationId: string,
  groupId: string,
): Promise<api.ActionResult<ServiceUnit[]>> => {
  const response = await api.POST<ServiceUnit[]>(
    api.SERVICE_UNIT_HISTORY_ENDPOINT(locationId, groupId),
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
    data: response.data,
  }
}

export { getAllServiceUnitHistoryAction }
