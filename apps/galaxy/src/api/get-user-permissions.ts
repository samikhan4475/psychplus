import * as api from './api'
import { GET_USER_PERMISSIONS_ENDPOINT } from './endpoints'

interface UserPermissionsResponse {
  userPermissions: Array<{
    name: string
    isUserAuthorized: boolean
  }>
}

const getUserPermissions = async () => {
  const response = await api.GET<UserPermissionsResponse>(
    GET_USER_PERMISSIONS_ENDPOINT,
  )

  if (response.state === 'error') {
    throw new Error(response.error)
  }

  const result = response.data.userPermissions.reduce((acc, permission) => {
    acc[permission.name] = permission.isUserAuthorized
    return acc
  }, {} as Record<string, boolean>)

  return result
}

export { getUserPermissions }
