'use server'

import { revalidateTag } from 'next/cache'
import * as api from '@/api'
import { PatientReferral } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

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
  revalidateTag(QuickNoteSectionName.QuicknoteSectionReferrals)
  return {
    state: 'success',
    data: response.data,
  }
}

export { updatePatientReferralAction }
