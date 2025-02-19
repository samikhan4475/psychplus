'use client'

import * as api from '@/api/api.client'
import { GET_CLINICS_ENDPOINT } from '@/api/endpoints'
import { Clinic, SelectOptionType } from '@/types'

const getClinicsOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.GET<Clinic[]>(GET_CLINICS_ENDPOINT, {
    next: { revalidate: 3600 },
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id,
    label: data.name,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getClinicsOptionsAction }
