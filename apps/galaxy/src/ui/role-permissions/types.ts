import { Metadata } from '@/types'

interface Permission {
  id: string
  metadata: Metadata
  recordStatus: string
  shortName: string
  displayName: string
  actorCategory: string
}

interface PermissionFieldList {
  [key: string]: string[]
}

interface PermissionList {
  [key: string]: Permission[]
}

export type { Permission, PermissionFieldList, PermissionList }
