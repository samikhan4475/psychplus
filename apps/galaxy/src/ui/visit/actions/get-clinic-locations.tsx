'use server'

import * as api from '@/api'
import { Clinic, SelectOptionType } from '@/types'

const getClinicLocations = async (
  stateId: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const url = new URL(api.CLINIC_LOCATIONS_ENDPOINT)
  url.searchParams.append('stateId', String(stateId))

  const response = await api.GET<Clinic[]>(url.toString())

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response?.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  return { state: 'success', data: transformedData }
}

export { getClinicLocations }
