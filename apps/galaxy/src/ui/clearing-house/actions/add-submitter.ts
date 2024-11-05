'use server'

import * as api from '@/api'
import type { ClearingHouseSubmitter } from '../types'

const addSubmitterAction = async (
  payload: Partial<ClearingHouseSubmitter>,
): Promise<api.ActionResult<ClearingHouseSubmitter>> => {
  const response = await api.POST<ClearingHouseSubmitter>(
    api.ADD_CLEARNING_HOUSE_SUBMITTER_ENDPOINT,
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

export { addSubmitterAction }
