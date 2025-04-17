import { Metadata } from './metadata'

interface Permission {
  id: string
  metadata: Metadata
  recordStatus: string
  shortName: string
  displayName: string
  displaySectionCode: string
  shouldAuditAccess: true
}

interface RolePermission {
  userRoleId: string
  userPermissionId: string
  organizationId: string
  metadata: Metadata
  recordStatus: string
  accessLevelCode: string
  accessRightCode: string
  operationalRightCode: string
  permission: Permission
}

interface Role {
  id: string
  metadata: Metadata
  recordStatus: string
  shortName: string
  displayName: string
  actorCategory: string
  rolePermissions?: RolePermission[]
  organizationId?: string
  practiceId?: string
  roleId?: string
}

export type { Role }
