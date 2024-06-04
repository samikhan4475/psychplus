import {
  FunctionalCognitive,
  RealCodeSet,
} from '@psychplus/functional-cognitive'

interface Filters {
  historyType: string
  symptomCode: string
  activeStatus: string
  effectiveDate: Date | null | string
}
// setFunctionalCognitives
interface FunctionalCognitiveState {
  functionalcognitives: FunctionalCognitive[]
  noteId: number
  patientId: number
  setFunctionalCognitives: (functionalcognitives: FunctionalCognitive[]) => void
  setPatientId: (patientId: number) => void
  setNoteId: (noteId: number) => void
}

interface FunctionalCognitiveFiltersState {
  filters: Filters
  handleFiltersChange: (newFilters: Partial<Filters>) => void
}

interface RealCodeSetState {
  realCodeSets: RealCodeSet[]
  setRealCodeSet: (realCodeSets: RealCodeSet[]) => void
}

type FunctionalCognitiveStoreType = RealCodeSetState & FunctionalCognitiveState

export type {
  Filters,
  FunctionalCognitiveState,
  FunctionalCognitiveStoreType,
  RealCodeSetState,
  FunctionalCognitiveFiltersState,
}
