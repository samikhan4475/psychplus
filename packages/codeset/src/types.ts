interface CodeSet {
  code: string
  display: string
  source: string
  codes: Code[]
}

interface MetaDataCodeSet {
  code: string
  display: string
  attributes?: CodeAttribute[]
}

interface Code {
  code: string
  display: string
  attributes?: CodeAttribute[]
  metadata?: CodeMetadata
}

interface CodeAttribute {
  name: string
  value: string
}

interface CodeMetadata {
  [key: string]: string | undefined
}

interface AuthorityCode {
  code: string
  codeSetId: string
  displayName: string
  id: string
  metadata: CodeMetadata
  recordStatus: string
}

interface AuthorityCodeSet {
  assigningAuthorityId: string
  codeSystemName: string
  codes: AuthorityCode[]
  displayName: string
  metadata: CodeMetadata
  recordStatus: string
}

interface CodeAttributes {
  metadata?: CodeMetadata
  name: string
  content: string
}

interface ParameterCodeSet {
  code: string
  metadata: CodeMetadata
  displayName: string
  codeAttributes: CodeAttributes[]
}
interface Parameter {
  codeSystemName: string
  displayName: string
  codes: ParameterCodeSet[]
}

interface RoleCode {
  code: string
  displayName: string
}
interface RelationshipCodeSet {
  codeSystemName: string
  displayName: string
  codes: RoleCode[]
}
type CodeSetIndex = { [key: string]: Code[] | undefined }

interface Metadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
  updatedOn: string
  updatedBy: number
  updatedByFullName: string
  deletedOn: string
  deletedBy: number
  deletedByFullName: string
}

export interface Snomed {
  codeSystemName: string
  displayName: string
  version: string
  oid: string
  codes: SnomedCode[]
}

export interface SnomedCode {
  code: string
  displayName: string
}
export interface IcdCodes {
  id: number
  metadata?: Metadata
  code: string
  description: string
  isFavorite?: boolean
  isActive?: boolean
}
export interface IcdFilters {
  codeOrDescription?: string
}
export interface RealCodeSet {
  id: string
  metadata: CodeSetsMetadata
  recordStatus: string
  namespace: string
  displayName: string
  oid: string
  viewPermissionCode: string
  editPermissionCode: string
  codesets: Codeset[]
}

export interface Codeset {
  id: string
  metadata: CodeSetsMetadata
  recordStatus: string
  assigningAuthorityId: string
  codeSystemName: string
  displayName: string
  oid: string
  codes: RealCode[]
  version?: string
}

export interface RealCode {
  id: string
  metadata: CodeSetsMetadata
  recordStatus: string
  codesetId: string
  code: string
  displayName: string
  codeAttributes?: RealCodeAttribute[]
  groupingCode?: string
}

export interface RealCodeAttribute {
  id: string
  metadata: CodeSetsMetadata
  recordStatus: string
  codeId: string
  name: string
  content: string
}

export interface CodeSetsMetadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
}

export type {
  CodeSet,
  Code,
  CodeAttribute,
  CodeSetIndex,
  AuthorityCodeSet,
  AuthorityCode,
  MetaDataCodeSet,
  ParameterCodeSet,
  Parameter,
  RelationshipCodeSet,
}
