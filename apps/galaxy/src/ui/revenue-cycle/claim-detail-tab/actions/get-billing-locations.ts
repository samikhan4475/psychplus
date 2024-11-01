'use server'

import * as api from '@/api'
import { Clinic } from '@/types'

const getBillingLocations = async (): Promise<api.ActionResult<Clinic[]>> => {
  const response = await api.GET<Clinic[]>(api.GET_CLINICS_ENDPOINT, {
    next: { revalidate: 3600 },
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

export { getBillingLocations }
