'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface ResetPasswordParams {
  resetCode: string
  newPassword: string
  confirmPassword: string
  emailAddress: string
}

const resetPasswordAction = async (
  params: ResetPasswordParams,
): Promise<ActionResult<void>> => {
  const result = await api.PATCH(
    `${API_URL}/api/users/self/forgotpassword`,
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
    data: undefined,
  }
}

export { resetPasswordAction }
