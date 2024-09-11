'use server'

import * as api from '@/api'
import type {
  GetPatientNotificationsResponse,
  NotificationSearchParams,
  PatientNotification,
} from '../../types'

interface GetPatientNotificationsParams {
  payload: NotificationSearchParams
}

const getPatientNotificationsAction = async ({
  payload,
}: GetPatientNotificationsParams): Promise<
  api.ActionResult<GetPatientNotificationsResponse>
> => {
  const response = await api.POST<PatientNotification[]>(
    `${api.GET_PATIENT_NOTIFICATIONS_ENDPOINT}`,
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
    data: {
      notifications: response.data,
    },
  }
}

export { getPatientNotificationsAction }
