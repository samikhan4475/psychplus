'use server'

import * as api from '@/api'
import { CPT } from '../types'

const updateMasterFeeScheduleAction = async (
  payload: Partial<CPT>,
  id: string,
): Promise<api.ActionResult<CPT>> => {
  const response = await api.PUT<CPT>(
    api.MASTER_FEE_SCHEDULE_ENDPOINT(id),
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

export { updateMasterFeeScheduleAction }
