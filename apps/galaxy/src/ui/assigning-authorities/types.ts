import { Metadata } from '@/types'

interface AssigningAuthority {
  id: string
  metadata: Metadata
  recordStatus: string
  namespace: string
  displayName: string
  oid: string
  viewPermissionCode: string
  editPermissionCode: string
  codesets: Codeset[]
}

interface Codeset {
  id: string
  metadata: Metadata
  recordStatus: string
  assigningAuthorityId: string
  codeSystemName: string
  displayName: string
  version: string
  oid: string
  validFrom: string
  validTo: string
  sourceName: string
  sourceUrl: string
  sourceFormat: string
  sourceUpdateDays: number
  viewPermissionCode: string
  editPermissionCode: string
  codes: Code[]
}

interface Code {
  id: string
  metadata?: Metadata
  recordStatus?: string
  codesetId: string
  code: string
  displayName: string
  groupingCode?: string
  codeAttributes?: CodeAttribute[]
}

interface CodeAttribute {
  id?: string
  metadata?: Metadata
  recordStatus?: string
  codeId: string
  name: string
  content: string
}

export type { AssigningAuthority, CodeAttribute, Code, Codeset }
