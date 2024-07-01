'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type CodeSet } from '@psychplus/codeset'
import { type User } from '@psychplus/user'
import { PatientProfileStoreType } from './store'
import { AuthorityNameSpace, RaceAndEthnicityCodeSet } from './types'
import { Patient } from '@psychplus/patient'

type BoundStoreType = UseBoundStore<StoreApi<PatientProfileStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  user: User
  codeSets: CodeSet[]
  patientProfile: Patient
  raceAndEthnicityCodeSet: RaceAndEthnicityCodeSet
  usStatesCodeSet: RaceAndEthnicityCodeSet
  hl7v3CodeSets: AuthorityNameSpace[]
  degreeCodeSets: RaceAndEthnicityCodeSet
}

const Preloader = ({ store, user, codeSets, patientProfile, raceAndEthnicityCodeSet, usStatesCodeSet, hl7v3CodeSets, degreeCodeSets }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setUser, setCodeSets, setPatientProfile, setRaceAndEthnicityCodeSets, setUsStatesCodeSet, setHlv3CodeSets, setDegreeCodeSets } = store((state) => ({
    setUser: state.setUser,
    setCodeSets: state.setCodeSets,
    setPatientProfile: state.setPatientProfile,
    setRaceAndEthnicityCodeSets: state.setRaceAndEthnicityCodeSets,
    setUsStatesCodeSet: state.setUsStatesCodeSets,
    setHlv3CodeSets: state.setHlv3CodeSets,
    setDegreeCodeSets: state.setDegreeCodeSets,
  }))

  if (!loaded.current) {
    loaded.current = true
    setUser(user)
    setCodeSets(codeSets)
    setPatientProfile(patientProfile)
    setRaceAndEthnicityCodeSets(raceAndEthnicityCodeSet)
    setUsStatesCodeSet(usStatesCodeSet)
    setHlv3CodeSets(hl7v3CodeSets)
    setDegreeCodeSets(degreeCodeSets)
  }

  return null
}

export { Preloader }
