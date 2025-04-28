import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { AppointmentMinimalDetails } from '@psychplus-v2/types'

export interface AppointmentDetailsParams {
  appointmentId: string
}

const getAppointmentRatingsStatus = async ({
  appointmentId,
}: AppointmentDetailsParams) => {
  const result = await api.POST<AppointmentMinimalDetails>(
    `${API_URL}/api/appointments/${appointmentId}/staffratings/actions/verify`,
    {},
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { getAppointmentRatingsStatus }
