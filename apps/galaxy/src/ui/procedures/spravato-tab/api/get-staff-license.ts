'use server'

import * as api from '@/api'

const getStaffLicense = async (): Promise<api.ActionResult<any>> => {
  const response = await api.POST<any>(api.GET_STAFF_LICENSE, {
    licenseTypes: ['DEA'],
  })
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

export { getStaffLicense }
