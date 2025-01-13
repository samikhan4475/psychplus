'use server'

import * as api from '@/api'

interface ForgotPasswordRequest {
  emailAddress: string
  resetCode: string
  newPassword: string
  confirmPassword: string
}

interface ForgotPasswordResponse {
  id: number
}

const changePasswordAction = async (
  payload: ForgotPasswordRequest,
): Promise<api.ActionResult<ForgotPasswordResponse>> => {
  const response = await api.PATCH<ForgotPasswordResponse>(
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

export { changePasswordAction }
