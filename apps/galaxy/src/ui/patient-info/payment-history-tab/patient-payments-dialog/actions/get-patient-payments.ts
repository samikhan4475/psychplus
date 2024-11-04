'use server'

import * as api from '@/api'
import type { PatientPayment } from '@/types'
import { GetPatientPaymentsData, GetPaymentPayload } from '../types'

const getPatientPaymentsAction = async (
  patientId: string,
  payload: GetPaymentPayload,
): Promise<api.ActionResult<GetPatientPaymentsData>> => {
  const response = await api.POST<PatientPayment[]>(
    api.GET_PATIENT_PAYMENTS_ENDPOINT(patientId),
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
      payments: response.data,
    },
  }
}

export { getPatientPaymentsAction }
