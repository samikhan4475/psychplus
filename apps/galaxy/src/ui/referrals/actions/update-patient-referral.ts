'use server'

import * as api from '@/api'
import { PatientReferral } from '@/types'

const updatePatientReferralAction = async (
  referral: PatientReferral,
): Promise<api.ActionResult<PatientReferral>> => {
  const response = await api.PUT<PatientReferral>(
    api.UPDATE_PATIENT_REFERRAL_ENDPOINT(referral.patientId, referral.id),
    referral,
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

export { updatePatientReferralAction }
