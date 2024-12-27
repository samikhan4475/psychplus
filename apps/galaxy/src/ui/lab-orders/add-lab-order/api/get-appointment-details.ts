'use server'

import * as api from '@/api'
import { AppointmentDetails } from '../blocks/types'

interface AppointmentDetailsTransform {
  dropDownValues: { label: string; value: string }[]
  appointmentDetails: AppointmentDetails
}

const getAppointmentDetails = async (
  appointmentId: string,
): Promise<api.ActionResult<AppointmentDetailsTransform>> => {
  const response = await api.GET<AppointmentDetails>(
    api.GET_APPOINTMENT(appointmentId),
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = {
    dropDownValues: [
      {
        label: response.data?.providerName ?? '',
        value: response.data.id?.toString() ?? '',
      },
    ],
    appointmentDetails: response.data,
  }

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getAppointmentDetails }
