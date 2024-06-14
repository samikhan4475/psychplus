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
interface FunctionalCognitive {
  id?: string
  metadata?: Metadata
  patientId?: number
  noteId?: number
  historyType?: string
  activeStatus?: string
  effectiveDate?: string
  symptomCode?: string
  notes?: string
  symptomCodesetUsed?: string
  symptomCodeDescription?: string
}

interface PatientParams {
  patientId: number
  noteId: number
}

interface IcdCodes {
  id: number
  metadata: Metadata
  code: string
  description: string
  isFavorite?: boolean
  isActive?: boolean
}

interface IcdFilters {
  codeOrDescription?: string
}

interface FunctionalCognitivePayload {
  payload: FunctionalCognitive
}

const STATUSES = [
  { value: 'Active', label: 'Active' },
  { value: 'Resolved', label: 'Resolved' },
]

const HISTORYTYPES = [
  { value: 'Functional', label: 'Functional' },
  { value: 'Cognitive', label: 'Cognitive' },
]

type OptionType = {
  value: string
  label: string
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
  codes: Code[]
  version?: string
}

export interface Code {
  id: string
  metadata: CodeSetsMetadata
  recordStatus: string
  codesetId: string
  code: string
  displayName: string
  codeAttributes?: CodeAttribute[]
  groupingCode?: string
}

export interface CodeAttribute {
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

export {
  type FunctionalCognitive,
  type FunctionalCognitivePayload,
  type IcdCodes,
  type IcdFilters,
  type OptionType,
  type PatientParams,
  STATUSES,
  HISTORYTYPES,
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
