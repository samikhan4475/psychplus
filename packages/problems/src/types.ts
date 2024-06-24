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
interface Problem {
  id?: string
  metadata?: Metadata
  problemDate?: string
  code?: string
  codeType?: string
  isPrimary?: boolean
  chronicity?: string
  severity?: string
  status?: string
  problemType?: string
  comments?: string
  patientId?: number
  noteId?: number
  recordStatus?: string
  symptomCode?: string
  activeStatus?: string
  symptomCodesetUsed?: string
  symptomCodeDescription?: string
  problem?: string
  problemId?: string
  resolvedDate?: string
}

interface PatientParams {
  patientId: number
  noteId: number
}

interface ProblemPayload {
  patientId: number | string
  payload: Problem
}

const CODING_SYSTEMS = [
  { value: 'ICD', label: 'ICD' },
  { value: 'Snomed', label: 'Snomed' },
]

const STATUSES = [
  { value: 'Active', label: 'Active' },
  { value: 'Resolved', label: 'Resolved' },
]

const CHRONICITIES = [
  { value: 'Chronic', label: 'Chronic' },
  { value: 'Acute', label: 'Acute' },
]

const SEVERITIES = [
  { value: 'Mild', label: 'Mild' },
  { value: 'Moderate', label: 'Moderate' },
  { value: 'Severe', label: 'Severe' },
  { value: 'Unknown', label: 'Unknown' },
]

type OptionType = {
  value: string
  label: string
}

export interface Provider {
  id: number
  code: string
  description: string
}

export interface TransformedData {
  description: string
  id: string
  code: string
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
  type Problem,
  type ProblemPayload,
  type OptionType,
  type PatientParams,
  STATUSES,
  CHRONICITIES,
  SEVERITIES,
  CODING_SYSTEMS,
}
