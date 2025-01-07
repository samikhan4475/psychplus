import * as api from '@/api'
import { Appointment } from '@/types'

interface AppointmentParams {
  id: string
  isIncludeCodes?: boolean
  isIncludeCosigners?: boolean
  isIncludeLocation?: boolean
}

const getAppointment = async ({
  id,
  isIncludeCodes = false,
  isIncludeCosigners = false,
  isIncludeLocation = false,
}: AppointmentParams): Promise<api.ActionResult<Appointment>> => {
  const url = new URL(api.GET_APPOINTMENT(id))
  if (isIncludeCodes) url.searchParams.append('isIncludeCodes', 'true')
  if (isIncludeCosigners) url.searchParams.append('isIncludeCosigners', 'true')
  if (isIncludeLocation) url.searchParams.append('isIncludeLocation', 'true')

  const response = await api.GET<Appointment>(url.toString())

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
