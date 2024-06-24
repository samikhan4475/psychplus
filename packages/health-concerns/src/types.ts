import { type Metadata } from '@psychplus/clinics/shared'

interface HealthProblem {
  id: string
  metadata: Metadata
  problemDate: Date
  symptomCode: string
  symptomCodesetUsed: string
  isPrimary: boolean
  chronicity: string
  severity: string
  activeStatus: string
  resolvedDate: Date | string
  problemType: string
  comments: string
  patientId: number
  noteId: number
  recordStatus: string
  dataSource: string
  symptomCodeDescription: string
  patientsHealthProblemId?: string
}

interface HealthObservation {
  id: string
  metadata: Metadata
  patientsHealthConcernId: string
  symptomCode: string
  symptomCodesetUsed: string
  moduleType: string
  patientsHealthProblemId: string
  patientHealthProblem: HealthProblem
  recordStatus: string
}

interface HealthObservationPayload {
  id: string
  patientId: number
}

interface HealthConcern {
  id: string
  metadata: Metadata
  healthConcernDate: Date | string
  symptomCode: string
  symptomCodesetUsed: string
  notes: string
  patientId: number
  noteId: number
  recordStatus: string
  symptomCodeDescription: string
  patientHealthObservations: HealthObservation[]
}

interface HealthConcernPayload {
  patientIds: number[]
  noteIds: number[]
  codingCodes: string[]
}

interface IcdFilters {
  codeOrDescription?: string
}

interface IcdCodes {
  id: number
  metadata?: Metadata
  code: string
  description: string
  isFavorite?: boolean
  isActive?: boolean
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
}

interface HealthObservationParams {
  patientId: number
  noteId: number
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

export type {
  HealthConcern,
  HealthConcernPayload,
  IcdFilters,
  IcdCodes,
  Problem,
  HealthObservationParams,
  HealthProblem,
  HealthObservation,
  HealthObservationPayload,
}
