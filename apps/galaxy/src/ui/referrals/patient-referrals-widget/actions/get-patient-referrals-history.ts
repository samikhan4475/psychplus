'use server'

import * as api from '@/api'
import type { PatientReferral } from '../types'

interface GetPatientReferralsParams {
  referralId: string
}

const getPatientReferralsHistoryAction = async ({
  referralId,
}: GetPatientReferralsParams): Promise<api.ActionResult<PatientReferral[]>> => {
  const response = await api.POST<PatientReferral[]>(
    api.GET_PATIENT_REFERRALS_HISTORY_ENDPOINT(referralId),
    {
      IsIncludeInsurance: true,
      IsIncludeNextAndPastVisits: true,
    },
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

export { getPatientReferralsHistoryAction }
