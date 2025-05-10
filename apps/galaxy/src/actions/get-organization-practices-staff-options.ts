'use server'

import * as api from '@/api'
import { SelectOptionType, StaffResource } from '@/types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: false,
}

interface Payload {
  organizationsIds?: string[]
  practicesIds?: string[]
  name?: string
}

interface StaffOptions extends SelectOptionType {
  id?: string
}

const getOrganizationStaffOptionsAction = async (
  payload?: Payload,
): Promise<api.ActionResult<StaffOptions[]>> => {
  const response = await api.POST<StaffResource[]>(api.GET_PROVIDERS_ENDPOINT, {
    ...defaultPayload,
    ...payload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: `${data.userId}`,
    label: data.legalName.firstName + ' ' + data.legalName.lastName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getOrganizationStaffOptionsAction }
