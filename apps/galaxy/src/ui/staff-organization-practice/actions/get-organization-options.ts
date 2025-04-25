'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: false,
}

interface Organization {
  id: string
  displayName: string
}

interface Payload {
  organizationId?: string
  userId?: string
}

const getOrganizationOptionsAction = async (
  payload?: Payload,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.POST<Organization[]>(
    api.GET_ORGANIZATIONS_ENDPOINT,
    {
      ...defaultPayload,
      ...payload,
    },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id,
    label: data.displayName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getOrganizationOptionsAction }
