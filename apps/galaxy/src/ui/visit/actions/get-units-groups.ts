'use server'

import * as api from '@/api'
import { SelectOptionType, Service } from '@/types'

const getUnitsGroupsAction = async ({
  serviceId,
  isUnit = false,
  isRoom = false,
  isGroup = false,
}: {
  serviceId: string
  isUnit?: boolean
  isRoom?: boolean
  isGroup?: boolean
}): Promise<api.ActionResult<SelectOptionType[]>> => {
  const body = {
    includeServiceUnit: isUnit,
    includeServiceRoom: isRoom,
    includeServiceGroup: isGroup,
    locationServiceIds: [serviceId],
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
        response.data[0]?.serviceUnits?.map((v) => ({
          label: v.unit,
          value: v.id,
        })) ?? [],
    }
  } else if (isRoom) {
    return {
      state: 'success',
      data:
        response.data[0]?.serviceRooms?.map((v) => ({
          label: v.room,
          value: v.id,
        })) ?? [],
    }
  }
  return {
    state: 'success',
    data:
      response.data[0]?.serviceGroups?.map((v) => ({
        label: v.group,
        value: v.id,
      })) ?? [],
  }
}

export { getUnitsGroupsAction }
