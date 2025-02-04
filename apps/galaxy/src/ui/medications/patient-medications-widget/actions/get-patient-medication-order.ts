'use server'

import * as api from '@/api'
import type { GetPatientMedicationOrderResponse } from '../types'

interface GetPatientMedicationsActionParams {
  patientId: string,
  prescriptionId: string,
}

const getPatientMedicationOrderAction = async ({
  patientId,
  prescriptionId
}: GetPatientMedicationsActionParams): Promise<
  api.ActionResult<GetPatientMedicationOrderResponse>
> => {
  const response = await api.GET<GetPatientMedicationOrderResponse>(
    api.GET_PATIENT_PRESCRIPTIONS_MEDICATION_ORDER(patientId, prescriptionId),
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

export { getPatientMedicationOrderAction }
