'use server'

import * as api from '@/api'
import { License, UpdateLicensePayload } from '../types'

const updateLicenseAction = async (
  staffId: number,
  data: UpdateLicensePayload,
): Promise<api.ActionResult<License>> => {
  const response = await api.PUT<License>(
    api.UPDATE_STAFF_LICENSE(staffId, data.id),
    data,
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

export { updateLicenseAction }
