'use server'

import * as api from '@/api'
import { Location } from '@/types'
import { LOCATION_LIST_TABLE_PAGE_SIZE } from '../constant'
import { GetLocationListParams, GetLocationListResponse } from '../location-tab'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeTestLocations: true,
}

const getLocationListAction = async ({
  page = 1,
  formValues,
  sort,
}: GetLocationListParams): Promise<
  api.ActionResult<GetLocationListResponse>
> => {
  const offset = (page - 1) * LOCATION_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.LOCATION_ENDPOINT)
  url.searchParams.append('limit', String(LOCATION_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  const response = await api.POST<Location[]>(url?.toString(), {
    ...defaultPayload,
    ...formValues,
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
      locations: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getLocationListAction }
