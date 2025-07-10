'use server'

import * as api from '@/api'
import { LIST_TABLE_PAGE_SIZE } from '@/ui/pharmacy-management/constants'
import type {
  GetPharmacyResponse,
  Pharmacy,
  PharmacySearchParams,
} from '../types'

const filterPharmacyAction = async (
  payload: PharmacySearchParams,
  page = 1,
): Promise<api.ActionResult<GetPharmacyResponse>> => {
  const url = new URL(api.SEARCH_MODAL_PHARMACIES)
  const offset = (page - 1) * LIST_TABLE_PAGE_SIZE

  url.searchParams.append('limit', String(LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  const response = await api.POST<Pharmacy[]>(`${url}`, payload)
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

export { filterPharmacyAction }
