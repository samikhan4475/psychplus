'use server'

import * as api from '@/api'
import { CPTRecord } from '@/types'

interface GetServiceMasterFeeScheduleResponse {
  serviceMasterFeeSchedule: CPTRecord[]
}

const getServiceMasterFeeSchedule = async (params: {
  cptCode: string
}): Promise<api.ActionResult<GetServiceMasterFeeScheduleResponse>> => {

  const url = new URL(api.GET_MASTER_FEE_SCHEDULES)
  url.searchParams.append('cptCode', params.cptCode)
  url.searchParams.append('offset', '0')
  url.searchParams.append('limit', '0')
  const response = await api.POST<CPTRecord[]>(url.toString(), params)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      serviceMasterFeeSchedule: response.data,
    },
  }
}

export { getServiceMasterFeeSchedule }
