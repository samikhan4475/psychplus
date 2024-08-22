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
  groupingCode?: string
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

interface ActiveCodeAttribute {
  id?: string
  metadata?: CodeMetadata
  recordStatus?: string
  codeId?: string
  name: string
  content: string
}

interface ActiveCode {
  id: string
  metadata: CodeMetadata
  recordStatus: string
  codesetId: string
  code: string
  displayName: string
  groupingCode: string
  codeAttributes: ActiveCodeAttribute[]
}
interface ActiveCodeSet {
  id: string
  metadata: CodeMetadata
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
  codes?: ActiveCode[]
}
type NewCode = null | Partial<{
  code: string
  displayName: string
  discription: string
  codeSystemName: string
  codeAttributes: ActiveCodeAttribute[]
}>

type NewAttribute = null | Partial<{ name: string; content: string }>
type EditableCode = null | Partial<ActiveCode>
type EditableAttribute = null | Partial<ActiveCodeAttribute>
interface AssigningAuthorities {
  assigningAuthorityId?: string
  codeSystemName?: string
  displayName: string
  editPermissionCode: string
  id?: string
  metadata?: CodeMetadata
  oid: string
  recordStatus?: string
  namespace: string
  version?: string
  viewPermissionCode: string
}

interface FeeScheduleCategory {
  code: string
  display: string
}

interface AssigningAuthority {
  id: string
  metadata: Metadata
  recordStatus: string
  namespace: string
  displayName: string
  oid: string
  viewPermissionCode: string
  editPermissionCode: string
  codesets?: ActiveCodeSet[]
}

export type {
  CodeSet,
  Code,
  CodeAttribute,
  CodeSetIndex,
  AuthorityCodeSet,
  AuthorityCode,
  MetaDataCodeSet,
  AssigningAuthority,
  ParameterCodeSet,
  Parameter,
  RelationshipCodeSet,
  ActiveCode,
  ActiveCodeAttribute,
  ActiveCodeSet,
  NewCode,
  NewAttribute,
  EditableCode,
  EditableAttribute,
  FeeScheduleCategory,
  AssigningAuthorities,
}
