'use server'

import * as api from '@/api'
import { PatientScheduleStatusHistory } from '../types'

const getScheduleStatusHistoryAction = async (
  patientId: string,
  appointmentId: number,
): Promise<api.ActionResult<PatientScheduleStatusHistory[]>> => {
  const response = await api.POST<PatientScheduleStatusHistory[]>(
    api.GET_PATIENT_SCHEDULING_STATUS_HISTORY(patientId, appointmentId),
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

export { getScheduleStatusHistoryAction }
