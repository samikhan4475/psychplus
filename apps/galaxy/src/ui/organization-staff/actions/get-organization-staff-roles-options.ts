'use server'

import * as api from '@/api'
import { Role, SelectOptionType } from '@/types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: false,
  isIncludeLocations: false,
}

type OrganizationsSearchParams = {
  payload: {
    organizationId?: string
    roleIds?: string[]
  }
  category?: boolean
}

const getOrganizationStaffRolesOptionsAction = async ({
  payload,
  category,
}: OrganizationsSearchParams): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.POST<Role[]>(api.GET_USER_ROLES, {
    ...defaultPayload,
    ...payload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  let transformedData = []
  if (category) {
    transformedData = response.data.map((data) => ({
      value: data.actorCategory,
      label: data.actorCategory,
    }))
  } else {
    transformedData = response.data.map((data) => ({
      value: data.id,
      label: data.displayName,
    }))
  }

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getOrganizationStaffRolesOptionsAction }
