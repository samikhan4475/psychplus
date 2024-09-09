'use server'

import * as api from '@/api'
import { transformInOption } from '../transform'
import { ClinicRaw, SelectOptionType } from '../types'

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
   
  return {
    state: 'success',
    data: transformInOption(result.data, 'name', 'id'),
  }
}

export { getClinicsAction }
