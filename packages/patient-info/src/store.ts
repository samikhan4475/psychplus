'use client'

import { type StateCreator } from 'zustand'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import {
  AuthorityCodeSets,
  AuthorityCodesetsIndex,
  AuthorityNameSpace,
  Patient,
} from '@psychplus/patient-info'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'

interface PatientProfileState {
  patientProfile: Patient
  setPatientProfile: (value: Patient) => void
}

const createPatientProfileStore: StateCreator<PatientProfileState> = (set) => ({
  patientProfile: {} as Patient,
  setPatientProfile: (patientProfile) => set({ patientProfile }),
})

interface RaceAndEthnicityCodeSetState {
  codeSets: AuthorityCodeSets
  raceAndEthnicityCodeSetIndex: AuthorityCodesetsIndex
  setRaceAndEthnicityCodeSets: (codes: AuthorityCodeSets) => void
}

const createRaceAndEthnicityCodeSetStore: StateCreator<
  RaceAndEthnicityCodeSetState
> = (set) => ({
  codeSets: {
    codeSystemName: '',
    displayName: '',
    codes: [],
  },
  raceAndEthnicityCodeSetIndex: {},
  setRaceAndEthnicityCodeSets: (codeSets) => {
    set({
      codeSets,
      raceAndEthnicityCodeSetIndex: createCodeSetIndex(codeSets),
    })
  },
})

const createCodeSetIndex = (codeSets: AuthorityCodeSets) => ({
  race: codeSets.codes.filter((code) => code.groupingCode?.startsWith('R1')),
  ethnicity: codeSets.codes.filter((code) =>
    code.groupingCode?.startsWith('E'),
  ),
})

interface UsStatesCodeSetsState {
  usStatesCodeSets: AuthorityCodeSets
  setUsStatesCodeSets: (codes: AuthorityCodeSets) => void
}

const createUsStatesCodeSetsStore: StateCreator<UsStatesCodeSetsState> = (
  set,
) => ({
  usStatesCodeSets: {
    codeSystemName: '',
    displayName: '',
    codes: [],
  },
  setUsStatesCodeSets: (usStatesCodeSets: AuthorityCodeSets) =>
    set({ usStatesCodeSets }),
})

interface DegreeCodeSetsState {
  degreeCodeSets: AuthorityCodeSets
  setDegreeCodeSets: (codes: AuthorityCodeSets) => void
}

const createDegreeCodeSetsStore: StateCreator<DegreeCodeSetsState> = (set) => ({
  degreeCodeSets: {
    codeSystemName: '',
    displayName: '',
    codes: [],
  },
  setDegreeCodeSets: (degreeCodeSets: AuthorityCodeSets) =>
    set({ degreeCodeSets }),
})

interface AuthorityCodeSetsState {
  hlv3CodeSets: AuthorityNameSpace[]
  hlv3CodeSetsIndex: AuthorityCodesetsIndex
  setHlv3CodeSets: (codes: AuthorityNameSpace[]) => void
}

const createHlv3CodeSetsStore: StateCreator<AuthorityCodeSetsState> = (
  set,
) => ({
  hlv3CodeSets: [],
  hlv3CodeSetsIndex: {},
  setHlv3CodeSets: (hlv3CodeSets) =>
    set({
      hlv3CodeSets,
      hlv3CodeSetsIndex: createAuthorityCodeSetsIndex(hlv3CodeSets),
    }),
})

const createAuthorityCodeSetsIndex = (codeSets: AuthorityNameSpace[]) =>
  codeSets[0].codesets.reduce(
    (acc, codeSet) => ({
      [codeSet?.codeSystemName]: codeSet?.codes,
      ...acc,
    }),
    {} as AuthorityCodesetsIndex,
  )

type PatientProfileStoreType = UserState &
  CodeSetState &
  PatientProfileState &
  RaceAndEthnicityCodeSetState &
  UsStatesCodeSetsState &
  AuthorityCodeSetsState &
  DegreeCodeSetsState

const useStore = createWithEqualityFn<PatientProfileStoreType>(
  combineStateCreators(
    createPatientProfileStore,
    createUserStore,
    createCodeSetStore,
    createRaceAndEthnicityCodeSetStore,
    createUsStatesCodeSetsStore,
    createHlv3CodeSetsStore,
    createDegreeCodeSetsStore,
  ),
  shallow,
)

export {
  useStore,
  createRaceAndEthnicityCodeSetStore,
  createUsStatesCodeSetsStore,
  createHlv3CodeSetsStore,
  createDegreeCodeSetsStore,
  type PatientProfileStoreType,
  type RaceAndEthnicityCodeSetState,
  type UsStatesCodeSetsState,
  type DegreeCodeSetsState,
  type AuthorityCodeSetsState, 
}
