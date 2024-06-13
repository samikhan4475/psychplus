import { StateCreator } from 'zustand'
import { RealCodeSet } from '@psychplus/immunization'
import { ImmunizationState } from '.'

const immunizationStore: StateCreator<ImmunizationState> = (set) => ({
  immunizations: [],
  appointmentId: 0,
  setAppointmentId: (appointmentId) => set({ appointmentId }),
  setImmunizations: (immunizations) => {
    set({ immunizations })
  },
})

type RealCodeSetState = {
  realCodeSets: RealCodeSet[]
  setRealCodeSet: (realCodeSets: RealCodeSet[]) => void
}

const realCodeSetStore: StateCreator<RealCodeSetState> = (set) => ({
  realCodeSets: [],
  setRealCodeSet: (realCodeSets: RealCodeSet[]) => {
    set({ realCodeSets })
  },
})

export { immunizationStore, realCodeSetStore }
