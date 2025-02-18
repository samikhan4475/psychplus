'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Appointment } from '@psychplus-v2/types'

interface ChangeAppointmentPaymentMethodParams {
  appointmentId: number
  paymentMethod: string
}

interface ChangeAppointmentPaymentMethodApiResponse {
  appointments: Appointment[]
}

const changeAppointmentPaymentMethod = async ({
  appointmentId,
  paymentMethod,
}: ChangeAppointmentPaymentMethodParams) => {
  const result = await api.PATCH<ChangeAppointmentPaymentMethodApiResponse>(
    `${API_URL}/api/patients/self/appointments/${appointmentId}/paymentmethods/${paymentMethod}`,{})

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

export { changeAppointmentPaymentMethod }
