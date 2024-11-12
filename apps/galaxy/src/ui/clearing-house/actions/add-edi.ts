'use server'

import * as api from '@/api'
import type { EdiItem } from '../types'

const addEdiAction = async (
  payload: Partial<EdiItem>,
): Promise<api.ActionResult<EdiItem>> => {
  const response = await api.POST<EdiItem>(
    api.ADD_CLEARNING_HOUSE_EDI_ENDPOINT,
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

export { addEdiAction }
