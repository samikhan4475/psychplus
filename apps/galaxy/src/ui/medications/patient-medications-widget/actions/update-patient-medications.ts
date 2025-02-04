'use server'

import * as api from '@/api'
import type { GetPatientMedicationsResponse, PatientMedication } from '../types'

interface GetPatientMedicationsParams {
  patientId: string,
  payload: Partial<PatientMedication>
}

const updatePatientMedicationAction = async ({
  patientId,
  payload
}: GetPatientMedicationsParams): Promise<
  api.ActionResult<GetPatientMedicationsResponse>
> => {
  const response = await api.POST<PatientMedication[]>(
    api.UPDATE_PATIENT_PRESCRIPTIONS_MEDICATIONS(patientId),
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
      medications: response.data,
    },
  }
}

export { updatePatientMedicationAction }
