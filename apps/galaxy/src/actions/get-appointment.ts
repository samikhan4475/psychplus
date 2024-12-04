'use server'

import * as api from '@/api'
import { Appointment } from '@/types'

const getAppointment = async (
  id: string,
): Promise<api.ActionResult<Appointment>> => {
  const response = await api.GET<Appointment>(api.GET_APPOINTMENT(id))

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

export { getAppointment }
