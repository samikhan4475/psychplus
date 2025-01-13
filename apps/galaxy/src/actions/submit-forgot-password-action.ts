'use server'

import * as api from '@/api'

interface ForgotPasswordRequest {
  emailAddress: string
}

interface ForgotPasswordResponse {
  message: string
}

const submitForgotPasswordAction = async (
  payload: ForgotPasswordRequest,
): Promise<api.ActionResult<ForgotPasswordResponse>> => {
  const response = await api.POST<ForgotPasswordResponse>(
    api.FORGOT_PASSWORD_ENDPOINT,
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
    data: response.data || undefined,
  }
}

export { submitForgotPasswordAction }
