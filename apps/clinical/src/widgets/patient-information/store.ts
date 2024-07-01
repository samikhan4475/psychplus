'use client'

import { type StateCreator } from 'zustand'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'
import {
  AuthorityNameSpace,
  Patient,
  RaceAndEthnicityCodeSet,
  RaceAndEthnicityCodeSetIndex,
} from './types'

interface PatientProfileState {
  patientProfile: Patient
  setPatientProfile: (value: Patient) => void
}

const createPatientProfileStore: StateCreator<PatientProfileState> = (set) => ({
  patientProfile: {} as Patient,
  setPatientProfile: (patientProfile) => set({ patientProfile }),
})

interface RaceAndEthnicityCodeSetState {
  codeSets: RaceAndEthnicityCodeSet
  raceAndEthnicityCodeSetIndex: RaceAndEthnicityCodeSetIndex
  setRaceAndEthnicityCodeSets: (codes: RaceAndEthnicityCodeSet) => void
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

const createCodeSetIndex = (codeSets: RaceAndEthnicityCodeSet) => ({
  race: codeSets.codes.filter((code) => code.groupingCode?.startsWith('R1')),
  ethnicity: codeSets.codes.filter((code) => code.groupingCode?.startsWith('E')),
})

interface UsStatesCodeSetsState {
  usStatesCodeSets: RaceAndEthnicityCodeSet
  setUsStatesCodeSets: (codes: RaceAndEthnicityCodeSet) => void
}

const createUsStatesCodeSetsStore: StateCreator<UsStatesCodeSetsState> = (set) => ({
  usStatesCodeSets: {
    codeSystemName: '',
    displayName: '',
    codes: [],
  },
  setUsStatesCodeSets: (usStatesCodeSets: RaceAndEthnicityCodeSet) => set({ usStatesCodeSets })
})

interface DegreeCodeSetsState {
  degreeCodeSets: RaceAndEthnicityCodeSet
  setDegreeCodeSets: (codes: RaceAndEthnicityCodeSet) => void
}

const createDegreeCodeSetsStore: StateCreator<DegreeCodeSetsState> = (set) => ({
  degreeCodeSets: {
    codeSystemName: '',
    displayName: '',
    codes: [],
  },
  setDegreeCodeSets: (degreeCodeSets: RaceAndEthnicityCodeSet) => set({ degreeCodeSets })
})

interface AuthorityCodeSetsState {
  hlv3CodeSets: AuthorityNameSpace[]
  hlv3CodeSetsIndex: RaceAndEthnicityCodeSetIndex
  setHlv3CodeSets: (codes: AuthorityNameSpace[]) => void
}

const createHlv3CodeSetsStore: StateCreator<AuthorityCodeSetsState> = (set) => ({
  hlv3CodeSets: [],
  hlv3CodeSetsIndex: {},
  setHlv3CodeSets: (hlv3CodeSets) => set({
    hlv3CodeSets,
    hlv3CodeSetsIndex: createAuthorityCodeSetsIndex(hlv3CodeSets)
  })
})

const createAuthorityCodeSetsIndex = (codeSets: AuthorityNameSpace[]) =>
 codeSets[0].codesets.reduce(
   (acc, codeSet) => ({
    [codeSet?.codeSystemName]: codeSet?.codes,
    ...acc
   }),
   {} as RaceAndEthnicityCodeSetIndex
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

export { useStore, type PatientProfileStoreType }
