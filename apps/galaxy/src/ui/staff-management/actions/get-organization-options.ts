'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: false,
  isIncludeLocations: false,
}

interface Organization {
  id: string
  displayName: string
}
interface OrganizationPayload {
  payload: {
    organizationId?: string
  }
}

const getOrganizationOptionsAction = async ({
  payload,
}: OrganizationPayload): Promise<api.ActionResult<SelectOptionType[]>> => {
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
