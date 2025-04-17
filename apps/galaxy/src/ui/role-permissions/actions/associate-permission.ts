'use server'

import * as api from '@/api'
import { Permission } from '../types'

interface GetOrganizationsListParams {
  userRoleId: string
  userPermissionId: string
}

const associatePermissionAction = async ({
  userRoleId,
  userPermissionId,
}: GetOrganizationsListParams): Promise<api.ActionResult<Permission[]>> => {
  const url = new URL(
    api.ASSOCIATE_PERMISSION_ENDPOINT(userRoleId, userPermissionId),
  )

  const response = await api.POST<Permission[]>(`${url}`, {})

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

export { associatePermissionAction }
