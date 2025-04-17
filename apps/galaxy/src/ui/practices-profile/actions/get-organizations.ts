'use server'

import * as api from '@/api'
import { Organization } from '@/types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: false,
  isIncludeLocations: true,
}

interface Payload {
  organizationId: string
}

interface OrganizationsSearchParams {
  payload: Payload
}

const getOrganizationsAction = async ({
  payload,
}: OrganizationsSearchParams): Promise<api.ActionResult<Organization[]>> => {
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

  return {
    state: 'success',
    data: response.data,
  }
}

export { getOrganizationsAction }
