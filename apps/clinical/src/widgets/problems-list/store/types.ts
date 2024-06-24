import { Problem, RealCodeSet } from '@psychplus/problems'

interface Filters {
  problemType: string
  symptomCodesetUsed: string
  symptomCode: string
  severity: string
  activeStatus: string
  problemDate: Date | null | string
}

interface ProblemState {
  problems: Problem[]
  noteId: number
  patientId: number
  setProblems: (problems: Problem[]) => void
  setPatientId: (patientId: number) => void
  setNoteId: (noteId: number) => void
}

interface ProblemFiltersState {
  filters: Filters
  handleFiltersChange: (newFilters: Partial<Filters>) => void
}

interface RealCodeSetState {
  realCodeSets: RealCodeSet[]
  setRealCodeSet: (realCodeSets: RealCodeSet[]) => void
}

type ProblemStoreType = RealCodeSetState & ProblemState & ProblemFiltersState

export type {
  Filters,
  ProblemState,
  ProblemStoreType,
  RealCodeSetState,
  ProblemFiltersState,
}
