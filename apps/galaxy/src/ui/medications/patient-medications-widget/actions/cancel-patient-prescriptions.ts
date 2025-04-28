'use server'

import * as api from '@/api'
import type { GetPatientMedicationOrderResponse } from '../types'

interface CancelPatientPrescriptionsParams {
  patientId: string
  externalPatientId?: number
  externalPrescriptionId: string
  externalMessageId: string
  writtenDate: string
}
const cancelPatientPrescriptions = async ({
  ...payload
}: CancelPatientPrescriptionsParams): Promise<
  api.ActionResult<GetPatientMedicationOrderResponse>
> => {
  const restPayload = {
    patientId: payload.externalPatientId,
    prescriptionId: payload.externalPrescriptionId,
    messageId: payload.externalMessageId,
    sentTime: payload.writtenDate,
  }
  const response = await api.POST<GetPatientMedicationOrderResponse>(
    api.CANCEL_PATIENT_SCRIPT_SURE_PRESCRIPTIONS(payload.patientId),
    { ...restPayload },
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
export { cancelPatientPrescriptions }
