'use client'

import * as api from '@/api/api.client'
import { GET_NEAR_TO_EXPIRE_STAFF_LICENSE_ENDPOINT } from '@/api/endpoints'
import { NearToExpireLicenseResponse } from '../types'

const getLicenseExpiryNotificationsAction = async (
  staffId: number,
): Promise<api.ActionResult<NearToExpireLicenseResponse[]>> => {
  const response = await api.GET<NearToExpireLicenseResponse[]>(
    GET_NEAR_TO_EXPIRE_STAFF_LICENSE_ENDPOINT(staffId),
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

export { getLicenseExpiryNotificationsAction }
