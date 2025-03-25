'use server'

import * as api from '@/api'
import { PatientReferral } from '@/types'

interface SignPatientReferralParam {
  patientId: number
  referralId: number
}

const signPatientReferralAction = async ({
  patientId,
  referralId,
}: SignPatientReferralParam): Promise<api.ActionResult<PatientReferral>> => {
  const response = await api.POST<PatientReferral>(
    api.SIGN_PATIENT_REFERRAL_ENDPOINT(patientId, referralId),
    {},
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

export { signPatientReferralAction }
