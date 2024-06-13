import { RealCodeSet, type Immunization } from '@psychplus/immunization'

interface Filters {
  immunizationNumber: string
}

interface ImmunizationState {
  immunizations: Immunization[]
  appointmentId: number
  setImmunizations: (immunizations: Immunization[]) => void
  setAppointmentId: (appointmentId: number) => void
}

interface RealCodeSetState {
  realCodeSets: RealCodeSet[]
  setRealCodeSet: (realCodeSets: RealCodeSet[]) => void
}

type ImmunizationStoreType = RealCodeSetState & ImmunizationState

export type {
  Filters,
  ImmunizationState,
  ImmunizationStoreType,
  RealCodeSetState,
}
