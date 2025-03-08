'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { STAFF_LOCATION_LIST_TABLE_PAGE_SIZE } from '../constants'
import { GetStaffLocationListResponse, StaffLocation } from '../types'

interface GetProviderLocationListParams {
  payload?: Partial<StaffLocation>
  page?: number
  sort?: Sort
}
const defaultPayLoad = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeExternalProviderId: true,
}

const getProviderLocationListAction = async ({
  payload,
  page = 1,
  sort,
}: GetProviderLocationListParams): Promise<
  api.ActionResult<GetStaffLocationListResponse>
> => {
  const offset = (page - 1) * STAFF_LOCATION_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_PROVIDER_LOCATIONS_ENDPOINT)
  url.searchParams.append('limit', String(STAFF_LOCATION_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<StaffLocation[]>(`${url}`, {
    ...defaultPayLoad,
    ...payload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: {
      staffLocations: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getProviderLocationListAction }
