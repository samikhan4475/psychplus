import { USER_PERMISSIONS } from '@/constants'
import { useStore } from '@/store'

const useHasPermission = (permission: keyof typeof USER_PERMISSIONS) => {
  const userPermissions = useStore((state) => state.permissions)
  return userPermissions[permission] ?? false
}

export { useHasPermission }
