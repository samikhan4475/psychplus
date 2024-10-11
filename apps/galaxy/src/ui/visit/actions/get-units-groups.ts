'use server'

import * as api from '@/api'
import { Service } from '@/types'

const getUnitsGroupsAction = async ({
  serviceId,
  isUnit,
}: {
  serviceId: string
  isUnit: boolean
}): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const body = {
    includeServiceUnit: isUnit,
    includeServiceGroup: !isUnit,
    serviceIds: [serviceId],
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

  if (isUnit) {
    return {
      state: 'success',
      data:
        response.data[0].serviceUnits?.map((v) => ({
          label: v.unit,
          value: v.id,
        })) ?? [],
    }
  }
  return {
    state: 'success',
    data:
      response.data[0].serviceGroups?.map((v) => ({
        label: v.group,
        value: v.id,
      })) ?? [],
  }
}

export { getUnitsGroupsAction }
