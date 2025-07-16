'use server'

import * as api from '@/api'
import { MatchingPatient } from '@/ui/external-referral/types'

const associateMatchingReferralAction = async (
  patientId: number,
  externalReferralId: string,
): Promise<api.ActionResult<MatchingPatient>> => {
  const response = await api.POST<MatchingPatient>(
    api.ASSOCIATE_MATCHING_REFERRAL_PATIENTS_ENDPOINT(
      patientId,
      externalReferralId,
    ),
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

export { associateMatchingReferralAction }
