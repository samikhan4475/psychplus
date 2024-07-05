import { CarePlan, RealCodeSet } from '@psychplus/care-plans'

interface CarePlanState {
  care_plans: CarePlan[]
  noteId: number
  patientId: number
  setcarePlans: (problems: CarePlan[]) => void
  setPatientId: (patientId: number) => void
  setNoteId: (noteId: number) => void
}

interface RealCodeSetState {
  realCodeSets: RealCodeSet[]
  setRealCodeSet: (realCodeSets: RealCodeSet[]) => void
}

type CarePlanStoreType = CarePlanState & RealCodeSetState

export type { CarePlanState, CarePlanStoreType, RealCodeSetState }
