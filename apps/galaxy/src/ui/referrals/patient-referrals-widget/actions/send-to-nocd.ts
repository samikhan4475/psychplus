'use server'

import * as api from '@/api'
import { PatientReferral } from '@/types'
import { SubmitExternalReferral } from '../types'

interface PatientReferralParam {
  payload: Partial<SubmitExternalReferral>
}

const submitExternalReferralAction = async ({
  payload,
}: PatientReferralParam): Promise<api.ActionResult<PatientReferral>> => {
  const response = await api.POST<PatientReferral>(
    api.SEND_TO_NOCD_REFERRAL_ENDPOINT,
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

export { submitExternalReferralAction }
