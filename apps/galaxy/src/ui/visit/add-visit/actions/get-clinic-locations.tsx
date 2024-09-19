'use server'

import * as api from '@/api'
import type { Clinic } from '../types'

const getClinicLocations = async (
  stateId: string,
): Promise<api.ActionResult<Clinic[]>> => {
  const url = new URL(api.CLINIC_LOCATIONS_ENDPOINT)
  url.searchParams.append('stateId', String(stateId))

  const response = await api.GET<Clinic[]>(url.toString())

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { getClinicLocations }
