'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface PreverifySignupParams {
  contactInfo: {
    email: string
  }
  legalName: {
    firstName: string
    lastName: string
  }
  dateOfBirth: string
}

const preverifySignupAction = async (
  params: PreverifySignupParams,
): Promise<api.ActionResult<void>> => {
  const result = await api.POST(
    `${API_URL}/api/users/signup/actions/preverify`,
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
    data: undefined,
  }
}

export { preverifySignupAction }
