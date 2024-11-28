'use server'

import * as api from '@/api'
import { ServiceMasterFeeScheduleResponse } from '@/types'

const getServiceMasterFeeSchedule = async (payload: {
  cptCode: string[]
}): Promise<api.ActionResult<ServiceMasterFeeScheduleResponse[]>> => {
  const url = new URL(api.GET_MASTER_FEE_SCHEDULES)
  // url.searchParams.append('cptCode', params.cptCode)

  url.searchParams.append('offset', '0')
  url.searchParams.append('limit', '0')
  const response = await api.POST<ServiceMasterFeeScheduleResponse[]>(
    url.toString(),
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

export { getServiceMasterFeeSchedule }
