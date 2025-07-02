'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { SchemaType as PatientExtReferralParams } from '../components/schema'
import { AddReferralResponse } from '../types'

const AddPatientExternalReferral = async ({
  ...params
}: PatientExtReferralParams): Promise<ActionResult<AddReferralResponse>> => {
  const result = await api.POST<AddReferralResponse>(
    `${API_URL}/api/externalreferrals`,
    params,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { AddPatientExternalReferral }
