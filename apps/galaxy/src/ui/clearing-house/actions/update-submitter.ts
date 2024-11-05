'use server'

import * as api from '@/api'
import type { ClearingHouseSubmitter } from '../types'

const updateSubmitterAction = async (
  payload: Partial<ClearingHouseSubmitter>,
  id: string,
): Promise<api.ActionResult<ClearingHouseSubmitter>> => {
  const response = await api.PUT<ClearingHouseSubmitter>(
    api.UPDATE_CLEARNING_HOUSE_SUBMITTER_ENDPOINT(id),
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

export { updateSubmitterAction }
