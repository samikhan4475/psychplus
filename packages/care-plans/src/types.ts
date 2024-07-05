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

interface CarePlan {
  id?: string
  metadata?: Metadata
  patientId: number
  noteId: number
  planType: string
  activeStatus: string
  planStartDate: string
  planEndDate: string
  planCode: string
  notes: string
  planCodesetUsed: string
  planCodeDescription?: string
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

interface CarePlanPayload {
  payload: CarePlan
  patientId: number
}

const CODING_SYSTEMS = [
  { value: 'ICD', label: 'ICD' },
  { value: 'Snomed', label: 'Snomed' },
]

const STATUSES = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Resolved', label: 'Resolved' },
]

const TYPES = [
  { value: 'ConsultationNote', label: 'Consultation Note' },
  { value: 'ProgressNote', label: 'Progress Note' },
  { value: 'Goal', label: 'Goal' },
  { value: 'HistoryAndPhysicalNote', label: 'History and Physical Note' },
]

export const DATE_FORMATE = 'MM/dd/yyyy'

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

export {
  type CarePlan,
  type CarePlanPayload,
  type IcdCodes,
  type IcdFilters,
  type OptionType,
  type PatientParams,
  STATUSES,
  TYPES,
  CODING_SYSTEMS,
}
