'use server'

import * as api from '@/api'
import type { OrganizationOptions, OrganizationOptionsResponse } from '../types'
import { transformInOptions } from './data'

const payload = {
  isIncludeMetadataResourceChangeControl: false,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: false,
  includePractices: true,
  includeUsers: false,
  includeRoles: true,
  includePermissions: false,
  recordStatuses: ['Active'],
}

const getStaffRolesOrganizationAction = async (): Promise<
  api.ActionResult<OrganizationOptions>
> => {
  const response = await api.POST<OrganizationOptionsResponse[]>(
    api.GET_ORGANIZATION_ROLES,
    payload,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: transformInOptions(response.data),
  }
}

export { getStaffRolesOrganizationAction }
