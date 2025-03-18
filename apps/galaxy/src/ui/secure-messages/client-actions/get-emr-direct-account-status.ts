'use client'

import * as api from '@/api/api.client'
import { GET_USER_EMR_DIRECT_STATUS_SECURE_MESSAGES } from '@/api/endpoints'
import { EMRDirectStatus } from '../types'

const getEmrDirectAccountStatus = async (): Promise<
  api.ActionResult<EMRDirectStatus>
> => {
  const response = await api.POST<EMRDirectStatus>(
    GET_USER_EMR_DIRECT_STATUS_SECURE_MESSAGES,
    {},
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: response.data,
  }
}

export { getEmrDirectAccountStatus }
