'use server'

import * as api from '@/api'
import { PrimaryLocation } from '../types'

const getPrimaryVirtualLocationHistoryAction = async (
  stateCode: string,
): Promise<api.ActionResult<PrimaryLocation[]>> => {
  const response = await api.POST<PrimaryLocation[]>(
    api.GET_PRIMARY_VIRTUAL_LOCATION_HX_ENDPOINT(stateCode),
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

export { getPrimaryVirtualLocationHistoryAction }
