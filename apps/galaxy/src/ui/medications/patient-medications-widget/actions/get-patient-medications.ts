'use server'

import * as api from '@/api'
import type { GetPatientMedicationsResponse, PatientMedication } from '../types'

interface GetPatientMedicationsParams {
  patientIds: string[]
}

const getPatientMedicationsAction = async ({
  patientIds,
}: GetPatientMedicationsParams): Promise<
  api.ActionResult<GetPatientMedicationsResponse>
> => {
  const response = await api.POST<PatientMedication[]>(
    api.GET_PATIENT_MEDICATIONS(),
    { patientIds },
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

export { getPatientMedicationsAction }
