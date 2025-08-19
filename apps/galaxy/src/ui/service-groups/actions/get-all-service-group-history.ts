'use server'

import * as api from '@/api'
import type { ServiceGroup } from '../types'

const getAllServiceGroupHistoryAction = async (
  locationId: string,
  groupId: string,
): Promise<api.ActionResult<ServiceGroup[]>> => {
  const response = await api.POST<ServiceGroup[]>(
    api.SERVICE_GROUP_HISTORY_ENDPOINT(locationId, groupId),
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

export { getAllServiceGroupHistoryAction }
