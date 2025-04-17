'use server'

import * as api from '@/api'
import { Role } from '@/types'

interface Payload {
  roleIds: string[]
}

interface GetRoleListParams {
  payload: Payload
}

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  includePermissions: true,
}

const getRoleProfileAction = async ({
  payload,
}: GetRoleListParams): Promise<api.ActionResult<Role[]>> => {
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
    data: response.data,
  }
}

export { getRoleProfileAction }
