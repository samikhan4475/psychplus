'use server'

import * as api from '@/api'
import { Clinic, SelectOptionType } from '@/types'

const getLocationOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const result = await api.GET<Clinic[]>(api.GET_CLINICS_ENDPOINT, {
    next: { revalidate: 3600 },
  })

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  const transformed = result.data.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })

  return {
    state: 'success',
    data: transformed,
  }
}

export { getLocationOptionsAction }
