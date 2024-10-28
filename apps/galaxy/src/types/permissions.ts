interface Permission {
    id: string
    recordStatus: string
    shortName: string
    displayName: string
    displaySectionCode: string
    shouldAuditAccess: boolean
  }
  interface RolePermission {
    userRoleId: string
    userPermissionId: string
    recordStatus: string
    accessLevelCode: string
    accessRightCode: string
    operationsRightCode: string
    permission: Permission
  }
  
  interface UserRole {
    id: string
    recordStatus: string
    shortName: string
    displayName: string
    actorCategory: string
    rolePermissions: RolePermission[]
  }
  interface User {
    id: number
    username: string
    legalName: {
      firstName: string
      middleName: string
      lastName: string
    }
    userRoleCode: string
    staffId: number
    patientId: number
    userRoles: UserRole[]
  }
  
  interface UserPermissionsResponse {
    id: string
    recordStatus: string
    shortName: string
    displayName: string
    users: User[]
  }

  export type { UserPermissionsResponse, Permission, RolePermission }