import * as api from '@/api'
import { Appointment } from '@/types'

interface PastAppointmentsResponse {
  previousAppointments: Appointment[]
}

const getPastAppointments = async (
  patientId: string,
): Promise<api.ActionResult<Appointment[]>> => {
  const response = await api.POST<PastAppointmentsResponse>(
    api.GET_PATIENT_APPOINTMENTS_HISTORY(patientId),
    {
      isIncludePatientTransactions: true,
      isIncludeEncounterTypes: true,
    },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data.previousAppointments,
  }
}

export { getPastAppointments }
