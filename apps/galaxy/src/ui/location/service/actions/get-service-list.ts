'use server'

import * as api from '@/api'
import { Service } from '@/types'
import { SERVICE_LIST_TABLE_PAGE_SIZE } from '../constant'
import { GetLocationServicesListParams } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  includeServiceUnit: true,
  includeServiceGroup: true,
  isIncludeServiceRoom: true,
  includeServiceVisitType: true,
  isIncludeTestLocations: true,
  includeServiceLocationCity: true,
  includeServiceLocationState: true,
}
const getServiceList = async ({
  page = 1,
  formValues,
  sort,
}: GetLocationServicesListParams): Promise<api.ActionResult<Service[]>> => {
  const offset = (page - 1) * SERVICE_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_LOCATION_SERVICES_ENDPOINT)
  url.searchParams.append('limit', String(SERVICE_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  } else {
    url.searchParams.append('orderBy', 'createdOn desc')
  }

  const response = await api.POST<Service[]>(url?.toString(), {
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
    data: response?.data,
    total: Number(response.headers.get('psychplus-totalresourcecount')),
  }
}

export { getServiceList }
