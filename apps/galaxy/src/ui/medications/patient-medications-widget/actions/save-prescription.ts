'use server'

import * as api from '@/api'
import type { GetPatientMedicationOrderResponse } from '../types'

const SavePatientPrescriptions = async ({
  ...payload
}: any): Promise<api.ActionResult<GetPatientMedicationOrderResponse>> => {
  const response = await api.POST<GetPatientMedicationOrderResponse>(
    api.SAVE_PATIENT_PRESCRIPTIONS(payload.patientId),
    { ...payload },
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

export { SavePatientPrescriptions }
