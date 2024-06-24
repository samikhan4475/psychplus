import { CodeSetState } from '@psychplus/codeset'
import { type HealthConcern } from '@psychplus/health-concerns/types'

interface HealthConcernState {
  healthConcerns: HealthConcern[]
  setHealthConcerns: (value: HealthConcern[]) => void
  patientId: number
  setPatientId: (patientId: number) => void
  noteId: number
  setNoteId: (noteId: number) => void
}

type HealthConcernsStoreType = CodeSetState & HealthConcernState

export type { HealthConcernState, HealthConcernsStoreType }
