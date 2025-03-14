import * as api from '@/api'
import { Appointment } from '@/types'

interface Payload {
  providerIds?: string[]
  startingDate?: string
  endingDate?: string
  visitMediums?: string[]
  IncludePatientData?: boolean
  isShowActiveVisits?: boolean
}

const getAppointments = async (
  payload: Payload,
): Promise<api.ActionResult<Appointment[]>> => {
  const response = await api.POST<Appointment[]>(
    api.SEARCH_BOOKED_APPOINTMENTS_ENDPOINT,
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

export { getAppointments }
