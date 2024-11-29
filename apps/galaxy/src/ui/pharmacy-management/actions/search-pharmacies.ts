'use server'

import * as api from '@/api'
import { LIST_TABLE_PAGE_SIZE } from '../constants'
import type { GetPharmacyResponse, Pharmacy, PharmacyParams } from '../types'

const searchPharmaciesAction = async (
  payload: PharmacyParams = {},
  page = 1,
): Promise<api.ActionResult<GetPharmacyResponse>> => {
  const offset = (page - 1) * LIST_TABLE_PAGE_SIZE
  const url = new URL(api.GET_PHARMACIES)
  url.searchParams.append('limit', String(LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))
  const response = await api.POST<Pharmacy[]>(url.toString(), payload)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      pharmacies: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { searchPharmaciesAction }
