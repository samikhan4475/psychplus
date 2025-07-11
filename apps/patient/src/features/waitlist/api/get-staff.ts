'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Staff } from '@psychplus/user'

const getStaff = async (payload?: {
  providerType?: string
  isIncludeTestProviders?: boolean
}) => {
  const response = await api.POST<Staff[]>(
    `${API_URL}/api/staff/search?includeInactive=true`,
    { ...payload },
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

export { getStaff }
