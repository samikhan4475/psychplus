import { StateCreator } from 'zustand'
import { CarePlanState, RealCodeSetState } from '.'

const carePlanStore: StateCreator<CarePlanState> = (set) => ({
  care_plans: [],
  patientId: NaN,
  noteId: NaN,
  setPatientId: (patientId) => set({ patientId }),
  setNoteId: (noteId) => set({ noteId }),
  setcarePlans: (care_plans) => {
    set({ care_plans })
  },
})

const realCodeSetStore: StateCreator<RealCodeSetState> = (set) => ({
  realCodeSets: [],
  setRealCodeSet: (realCodeSets) => {
    set({ realCodeSets })
  },
})

export { carePlanStore, realCodeSetStore }
