'use client'

import { type StateCreator } from 'zustand'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { CodeSetState, createCodeSetStore } from '@psychplus/codeset'
import {
  createPatientStore,
  Patient,
  type PatientState,
} from '@psychplus/patient'
import {
  AuthorityCodeSetsState,
  createDegreeCodeSetsStore,
  createHlv3CodeSetsStore,
  createRaceAndEthnicityCodeSetStore,
  createUsStatesCodeSetsStore,
  type DegreeCodeSetsState,
  type RaceAndEthnicityCodeSetState,
  type UsStatesCodeSetsState,
} from '@psychplus/patient-info'
import { combineStateCreators } from '@psychplus/utils/store'

interface State {
  patientHistory: Patient[]
  setPatientHistory: (value: Patient[]) => void
}

const createStore: StateCreator<State> = (set) => ({
  patientHistory: [],
  setPatientHistory: (patientHistory) => set({ patientHistory }),
})

type PatientHistoryStoreType = PatientState &
  State &
  CodeSetState &
  UsStatesCodeSetsState &
  RaceAndEthnicityCodeSetState &
  DegreeCodeSetsState &
  AuthorityCodeSetsState

const useStore = createWithEqualityFn<PatientHistoryStoreType>(
  combineStateCreators(
    createStore,
    createPatientStore,
    createCodeSetStore,
    createUsStatesCodeSetsStore,
    createRaceAndEthnicityCodeSetStore,
    createDegreeCodeSetsStore,
    createHlv3CodeSetsStore,
  ),
  shallow,
)

export { useStore, type PatientHistoryStoreType }
