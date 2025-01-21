'use client'

import * as api from '@/api/api.client'
import { CLINIC_LOCATIONS_ENDPOINT } from '@/api/endpoints'
import { Clinic, SelectOptionType } from '@/types'

const getClinicLocations = async (
  stateId: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const url = `${CLINIC_LOCATIONS_ENDPOINT}?stateId=${stateId}`
  const response = await api.GET<Clinic[]>(url)

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
