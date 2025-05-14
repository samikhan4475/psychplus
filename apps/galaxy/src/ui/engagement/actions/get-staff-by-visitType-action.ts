'use client'

import * as api from '@/api/api.client'
import { GET_STAFF_ENDPOINT } from '@/api/endpoints'
import { StaffResource } from '@/types'

const getStaffByVisitTypeAction = async (payload?: {
  servicesOffered?: string
  isIncludeTestProviders?: boolean
}): Promise<api.ActionResult<StaffResource[]>> => {
  const response = await api.POST<StaffResource[]>(GET_STAFF_ENDPOINT, payload)
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

export { getStaffByVisitTypeAction }
