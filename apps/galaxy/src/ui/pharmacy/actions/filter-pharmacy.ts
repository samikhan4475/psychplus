'use server'

import * as api from '@/api'
import type { Pharmacy, PharmacySearchParams } from '../types'

const filterPharmacyAction = async (
  payload: PharmacySearchParams,
): Promise<api.ActionResult<Pharmacy[]>> => {
  const response = await api.POST<Pharmacy[]>(
    api.SEARCH_MODAL_PHARMACIES,
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

export { filterPharmacyAction }
