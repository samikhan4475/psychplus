'use server'

import * as api from '@/api'
import { PatientReferral } from '@/types'
import { SchemaType } from '../create-referral-form'

const createPatientReferralAction = async (
  payload: SchemaType,
): Promise<api.ActionResult<PatientReferral>> => {
  const response = await api.POST<PatientReferral>(
    api.CREATE_PATIENT_REFERRAL_ENDPOINT(payload.patientId),
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
    data: response.data,
  }
}

export { createPatientReferralAction }
