'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface payload {
  staffEmail: string
}

interface AcsFeature {
  externalId: string
  tokenExpiresAt: string
  token: string
  staffName: {
    firstName: string
    middleName: string
    lastName: string
    honors: string
  }
  callUrl: string
}

const acs_enabled = (payload: payload) => {
  const url = new URL(
    `${API_URL}/api/patients/self/communications/actions/accesstoken`,
  )

  return api.POST<AcsFeature>(url.toString(), payload)
}

export { acs_enabled }
