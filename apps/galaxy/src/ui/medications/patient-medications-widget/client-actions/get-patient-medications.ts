'use client'

import * as api from '@/api/api.client'
import { GET_PATIENT_MEDICATIONS } from '@/api/endpoints'
import type { GetPatientMedicationsResponse, PatientMedication } from '../types'

interface GetPatientMedicationsParams {
  patientIds: string[]
  medicationStatuses?: string[]
}

const getPatientMedicationsAction = async ({
  patientIds,
  medicationStatuses
}: GetPatientMedicationsParams): Promise<
  api.ActionResult<GetPatientMedicationsResponse>
> => {
  const response = await api.POST<PatientMedication[]>(
    GET_PATIENT_MEDICATIONS(),
    { patientIds,medicationStatuses },
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
