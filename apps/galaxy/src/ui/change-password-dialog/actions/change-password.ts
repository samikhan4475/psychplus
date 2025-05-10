'use server'

import * as api from '@/api'

interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const changePassword = async (
  payload: ChangePasswordPayload,
): Promise<api.ActionResult<boolean>> => {
  const response = await api.PATCH(api.CHANGE_PASSWORD, payload)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: true,
  }
}

export { changePassword }
