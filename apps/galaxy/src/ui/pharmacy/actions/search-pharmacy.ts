'use server'

import * as api from '@/api'
import type { Pharmacy, PharmacyParams } from '../types'

const searchPharmaciesAction = async (
  patientId: string,
  payload?: PharmacyParams,
): Promise<api.ActionResult<Pharmacy[]>> => {
  const response = await api.POST<Pharmacy[]>(
    api.SEARCH_PHARMACIES(patientId),
    payload,
  )
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

export { searchPharmaciesAction }
