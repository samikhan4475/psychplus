'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface StartForgotPasswordParams {
  emailAddress: string
  phoneNumber?: string
}

const startForgotPasswordAction = async (
  params: StartForgotPasswordParams,
): Promise<ActionResult<void>> => {
  const result = await api.POST(
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

export { startForgotPasswordAction }
