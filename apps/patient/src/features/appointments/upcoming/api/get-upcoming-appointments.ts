import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Appointment } from '@psychplus-v2/types'

interface UpcomingAppointmentsApiResponse {
  appointments: Appointment[]
}

interface UpcomingAppointmentsParams {
  maxFutureDays: number
  includeStaffBio: boolean
}

const getUpcomingAppointments = () => {
  const url = new URL(`${API_URL}/api/appointments/upcoming/search`)
  url.searchParams.set('offset', '0')
  url.searchParams.set('limit', '0')

  const requestPayload: UpcomingAppointmentsParams = {
    maxFutureDays: 14,
    includeStaffBio: true,
  }

  return api.POST<UpcomingAppointmentsApiResponse>(
    url.toString(),
    requestPayload,
  )
}

export { getUpcomingAppointments }
