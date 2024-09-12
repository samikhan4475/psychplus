'use server'

import * as api from '@/api'
import { ClinicRaw } from '@/types'
import { SelectOptionType } from '../types'

const getClinicsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const result = await api.GET<ClinicRaw[]>(api.GET_CLINICS_ENDPOINT)

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  const transformedData = result?.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }))
  return {
    state: 'success',
    data: transformedData,
  }
}

export { getClinicsAction }
