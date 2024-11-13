'use server'

import * as api from '@/api'
import { CPT } from '../types'

const deleteMasterFeeScheduleAction = async (
  id: string,
): Promise<api.ActionResult<CPT>> => {
  const response = await api.DELETE<CPT>(api.MASTER_FEE_SCHEDULE_ENDPOINT(id))

  if (response.state === 'error') {
    return {
      state: 'error',
      error:  response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { deleteMasterFeeScheduleAction }
