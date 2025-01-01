'use server'

import * as api from '@/api'
import { Service } from '@/types'
import { GetUnitsGroupsResponse } from '../types'

const getUnitsGroupsAction = async (
  locationServiceIds: string[],
): Promise<api.ActionResult<GetUnitsGroupsResponse>> => {
  const body = {
    includeServiceUnit: true,
    includeServiceGroup: true,
    isIncludeServiceRoom: true,
    locationServiceIds,
  }

  const response = await api.POST<Service[]>(
    api.SEARCH_LOCATION_SERVICES_ENDPOINT,
    body,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.reduce(
    (acc, service) => ({
      serviceUnits: [...(service?.serviceUnits ?? []), ...(acc?.serviceUnits?? [])],
      serviceGroups: [...(service?.serviceGroups ?? []), ...(acc?.serviceGroups?? [])],
      serviceRooms: [...(service?.serviceRooms?? []), ...(acc?.serviceRooms?? [])]
    }),
    {} as GetUnitsGroupsResponse,
  )

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getUnitsGroupsAction }
