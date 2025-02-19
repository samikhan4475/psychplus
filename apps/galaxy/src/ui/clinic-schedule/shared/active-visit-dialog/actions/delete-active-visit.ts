'use server'

import * as api from '@/api'
import { Appointment } from '@/types'
import { DeleteActiveVisit } from '../types'

const deleteActiveVisit = async ({
  patientId,
  appointmentId,
}: DeleteActiveVisit): Promise<api.ActionResult<Appointment>> => {
  const response = await api.DELETE<Appointment>(
    api.DELETE_PATIENT_APPOINTMENT_ENDPOINT(patientId, appointmentId),
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

export { deleteActiveVisit }
