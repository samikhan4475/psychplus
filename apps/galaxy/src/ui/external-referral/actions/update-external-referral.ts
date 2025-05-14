'use server'

import * as api from '@/api'
import { Patient } from '../types'

const updateExternalReferralAction = async (
  externalReferralId: number,
  payload: Partial<Patient>,
): Promise<api.ActionResult<void>> => {
  const result = await api.PUT(
    api.UPDATE_EXTERNAL_REFERRAL_PATIENT_ENDPOINT(externalReferralId),
    payload,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: undefined,
  }
}

export { updateExternalReferralAction }
