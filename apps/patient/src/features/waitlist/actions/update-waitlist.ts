'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface WaitlistPayload {
  id: string
  serviceOffered: string
  providerId: number
  visitMedium: string
  priority: string
  fromDate: string
  toDate: string
  fromTime?: string
  toTime?: string
  patientId: number
}

const updateWaitlist = async (payload: WaitlistPayload) => {
  const result = await api.PUT(
    `${API_URL}/api/patients/self/waitlists/${payload.id}`,
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
    data: result.data,
  }
}

export { updateWaitlist, type WaitlistPayload }
