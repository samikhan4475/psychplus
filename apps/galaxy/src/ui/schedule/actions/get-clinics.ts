'use server'

import * as api from '@/api'
import { Clinic } from '@/types'

const getClinicsOptionsAction = async (): Promise<
  { label: string; value: string }[]
> => {
  const response = await api.GET<Clinic[]>(api.GET_CLINICS_ENDPOINT)

  if (response.state === 'error') {
    throw new Error(response.error)
  }

  const transformedData = response.data.map((data) => ({
    value: data.id,
    label: data.name,
  }))

  return transformedData
}

export { getClinicsOptionsAction }
