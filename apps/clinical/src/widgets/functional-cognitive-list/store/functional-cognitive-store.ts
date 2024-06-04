import { StateCreator } from 'zustand'
import { RealCodeSet } from '@psychplus/functional-cognitive'
import { FunctionalCognitiveState, RealCodeSetState } from '.'

const functionalCognitiveStore: StateCreator<FunctionalCognitiveState> = (
  set,
) => ({
  functionalcognitives: [],
  patientId: NaN,
  noteId: NaN,
  setPatientId: (patientId) => set({ patientId }),
  setNoteId: (noteId) => set({ noteId }),
  setFunctionalCognitives: (functionalcognitives) => {
    set({ functionalcognitives })
  },
})

const realCodeSetStore: StateCreator<RealCodeSetState> = (set) => ({
  realCodeSets: [],
  setRealCodeSet: (realCodeSets: RealCodeSet[]) => {
    set({ realCodeSets })
  },
})

export { functionalCognitiveStore, realCodeSetStore }
