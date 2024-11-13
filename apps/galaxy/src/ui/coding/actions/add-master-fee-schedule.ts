'use server'

import * as api from '@/api'
import { CPT } from '../types'

const addMasterFeeScheduleAction = async (
  payload: Partial<CPT>,
): Promise<api.ActionResult<CPT>> => {
  const response = await api.POST<CPT>(
    api.ADD_MASTER_FEE_SCHEDULE_ENDPOINT,
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

export { addMasterFeeScheduleAction }
