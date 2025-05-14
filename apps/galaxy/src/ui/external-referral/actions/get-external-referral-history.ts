'use server'

import * as api from '@/api'
import { PatientHistoryParams } from '@/types'
import { Patient } from '@/ui/external-referral/types'

const getExternalReferralPatientHistoryAction = async (
  externalreferralId: string,
  payload: PatientHistoryParams,
): Promise<api.ActionResult<Patient[]>> => {
  const response = await api.POST<Patient[]>(
    api.GET_EXTERNAL_REFERRAL_PATIENTS_INFO_HISTORY(externalreferralId),
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

export { getExternalReferralPatientHistoryAction }
