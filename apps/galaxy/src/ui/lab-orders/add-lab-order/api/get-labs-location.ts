'use server'

import * as api from '@/api'
import { LabsLocation } from '../blocks/types'

const getLabsLocation = async (payload: {
  recordStatuses: string[]
}): Promise<api.ActionResult<LabsLocation[]>> => {
  const response = await api.POST<LabsLocation[]>(api.GET_LABS_LOCATION, {
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

export { getLabsLocation }
