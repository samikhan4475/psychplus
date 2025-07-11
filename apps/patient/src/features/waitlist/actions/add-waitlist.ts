'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { WaitlistPayload } from './update-waitlist'

const addWaitlist = async (payload: WaitlistPayload) => {
  const result = await api.POST(`${API_URL}/api/patients/self/waitlists`, {
    ...payload,
  })

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

export { addWaitlist }
