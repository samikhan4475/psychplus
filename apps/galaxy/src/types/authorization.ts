import { Metadata } from './metadata'

interface Role {
    id: number,
    metadata: Metadata,
    recordStatus: string,
    shortName: string,
    displayName: string,
    actorCategory: string,
    rolePermissions: RolePermission[]
}

interface RolePermission {
    id: string,
    metadata: Metadata,
    recordStatus: string,
    shortName: string,
    displayName: string,
    displaySectionCode: string,
    shouldAuditAccess: true
}

export type { Role,RolePermission}