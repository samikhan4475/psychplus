'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface SendSignupOtpParams {
  emailAddress: string
  phoneNumber?: string
}

const sendSignupOtpAction = async (
  params: SendSignupOtpParams,
): Promise<ActionResult<void>> => {
  const result = await api.POST(`${API_URL}/api/users/signup/otp`, params)

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error || 'Something went wrong',
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { sendSignupOtpAction }
