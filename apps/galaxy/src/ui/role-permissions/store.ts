import { create } from 'zustand'
import { Role } from '@/types'
import { PermissionFieldList, PermissionList } from './types'

interface Store {
  selectedPermissions: PermissionFieldList
  setSelectedPermissions: (column: PermissionFieldList) => void
  permissions: PermissionList
  setPermissions: (column: PermissionList) => void
  roleProfile?: Role
  setRoleProfile: (column: Role) => void
}

const useStore = create<Store>((set) => ({
  selectedPermissions: {},
  permissions: {},
  roleProfile: undefined,
  setRoleProfile: (roleProfile) => {
    set({
      roleProfile,
    })
  },
  setSelectedPermissions: (selectedPermissions) => {
    set({
      selectedPermissions,
    })
  },
  setPermissions: (permissions) => {
    set({
      permissions,
    })
  },
}))

export { useStore }
