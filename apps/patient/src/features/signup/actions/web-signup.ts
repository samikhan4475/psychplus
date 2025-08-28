'use server'

import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { WebsiteSignupUserResponse } from '../types'

interface WebPatientSignupParams {
  legalName: {
    firstName: string
    lastName: string
  }
  dateOfBirth: string
  contactInfo: {
    email: string
    phoneNumbers: Array<{
      type: string
      number: string
    }>
  }
  password : string
  hipaaConsentOn: string
  termsOfServiceConsentOn: string
  privacyPolicyConsentOn: string
  guardian?: {
    name: {
      firstName: string
      lastName: string
    }
  }
}

const webPatientSignupAction = async (
  params: WebPatientSignupParams,
): Promise<ActionResult<WebsiteSignupUserResponse>> => {
  const result = await api.POST<WebsiteSignupUserResponse>(
    `${API_URL}/api/users/actions/webpatientsignup`,
    params,
  )
  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error || 'Something went wrong',
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { webPatientSignupAction }
