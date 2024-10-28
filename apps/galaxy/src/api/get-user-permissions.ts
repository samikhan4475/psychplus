import { RolePermission, UserPermissionsResponse } from '@/types'
import * as api from './api'
import { GET_USER_PERMISSIONS_ENDPOINT } from './endpoints'

const getUserPermissions = async () => {
  const response = await api.GET<UserPermissionsResponse[]>(
    GET_USER_PERMISSIONS_ENDPOINT,
  )

  if (response.state === 'error') {
    throw new Error(response.error)
  }

  const result = response.data[0].users[0].userRoles[0].rolePermissions.reduce(
    (acc, rolePermission) => {
      acc[rolePermission.permission.shortName] = rolePermission
      return acc
    },
    {} as Record<string, RolePermission>,
  )

  return result
}

export { getUserPermissions }
