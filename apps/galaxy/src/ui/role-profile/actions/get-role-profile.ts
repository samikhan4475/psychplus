'use server'

import * as api from '@/api'
import { Role } from '@/types'

interface RoleParams {
  roleId?: string
  roleIds?: string[]
  includePermissions?: true
  partialShortName?: string
  recordStatuses?: string[]
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
}

const defaultPayload: RoleParams = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  includePermissions: true,
}

const getRoleProfileAction = async ({
  payload,
}: {
  payload?: RoleParams
}): Promise<api.ActionResult<Role | null>> => {
  const url = new URL(api.GET_USER_ROLES)

  const response = await api.POST<Role[]>(`${url}`, {
    ...defaultPayload,
    ...payload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data.length > 0 ? response.data[0] : null,
  }
}

export { getRoleProfileAction }
