'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'
import { Organization } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: false,
  isIncludeLocations: false,
}

const getOrganizationStaffRolesOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.POST<Organization[]>(api.GET_ORGANIZATION_ROLES, {
    ...defaultPayload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const roleLookup: Record<string, SelectOptionType> = {}

  response.data?.forEach(({ users }) => {
    users?.forEach(({ userRoles }) => {
      userRoles?.forEach(({ displayName, id }) => {
        roleLookup[id] = { label: displayName, value: id }
      })
    })
  })

  return {
    state: 'success',
    data: Object.values(roleLookup),
  }
}

export { getOrganizationStaffRolesOptionsAction }
