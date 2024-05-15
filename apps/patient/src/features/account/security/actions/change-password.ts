'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface ChangePasswordParams {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const changePasswordAction = async (
  params: ChangePasswordParams,
): Promise<ActionResult<void>> => {
  const result = await api.PATCH(
    `${API_URL}/api/users/self/changepassword`,
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

export { changePasswordAction }
