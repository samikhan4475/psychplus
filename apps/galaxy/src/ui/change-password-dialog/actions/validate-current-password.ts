'use server'

import * as api from '@/api'

interface ValidateCurrentPasswordPayload {
  username: string
  password: string
}

const validateCurrentPassword = async (
  payload: ValidateCurrentPasswordPayload,
) => {
  const response = await api.POST(api.VALIDATE_CURRENT_PASSWORD, payload)
  if (response.state === 'error') {
    return false
  }
  return true
}

export { validateCurrentPassword }
