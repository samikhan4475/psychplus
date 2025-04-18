'use server'

import * as api from '@/api'
import { ClinicSchedule } from "../types"

const getClinicStatusHistoryList = async (staffId:string,clinicTimeId:number
): Promise<api.ActionResult<ClinicSchedule[]>> => {
    const url = new URL(api.GET_CLINIC_STATUS_HISTORY(staffId,clinicTimeId))
  
  const response = await api.POST<ClinicSchedule[]>(url.toString(),{})
  
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return response
}

export { getClinicStatusHistoryList }