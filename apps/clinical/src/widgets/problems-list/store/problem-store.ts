import { StateCreator } from 'zustand'
import { RealCodeSet } from '@psychplus/problems'
import { ProblemState, RealCodeSetState } from '.'

const problemStore: StateCreator<ProblemState> = (set) => ({
  problems: [],
  patientId: NaN,
  noteId: NaN,
  setPatientId: (patientId) => set({ patientId }),
  setNoteId: (noteId) => set({ noteId }),
  setProblems: (problems) => {
    set({ problems })
  },
})

const realCodeSetStore: StateCreator<RealCodeSetState> = (set) => ({
  realCodeSets: [],
  setRealCodeSet: (realCodeSets: RealCodeSet[]) => {
    set({ realCodeSets })
  },
})

export { problemStore, realCodeSetStore }
