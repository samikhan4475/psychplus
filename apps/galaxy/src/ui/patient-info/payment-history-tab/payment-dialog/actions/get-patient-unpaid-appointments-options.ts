'use server'

import * as api from '@/api'
import { Appointment, PaymentType } from '@/types'

const getPatientUnpaidAppointmentsAction = async (
  patientId: string,
  paymentType: PaymentType,
): Promise<api.ActionResult<Appointment[]>> => {
  const response = await api.GET<Appointment[]>(
    api.GET_PATIENT_UNPAID_APPOINTMENTS_ENDPOINT(patientId, paymentType),
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

export { getPatientUnpaidAppointmentsAction }
