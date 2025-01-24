'use server'

import * as api from '@/api'
import { AddLicensePayload, License } from '../types'

const addLicenseAction = async (
  staffId: number,
  data: AddLicensePayload,
): Promise<api.ActionResult<License>> => {
  const response = await api.POST<License>(api.ADD_STAFF_LICENSE(staffId), data)
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

export { addLicenseAction }
