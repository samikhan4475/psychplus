'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Referral } from '../types'

const getReferralsAction = async () => {
  const result = await api.GET<Referral[]>(
    `${API_URL}/api/patients/self/referrals`,
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

export { getReferralsAction }
