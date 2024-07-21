'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { CodeSet } from '@psychplus/codeset'
import { Patient } from '@psychplus/patient'
import { type PatientHistoryStoreType } from './store'
import { AuthorityCodeSets, AuthorityNameSpace } from '@psychplus/patient-info'

type BoundStoreType = UseBoundStore<StoreApi<PatientHistoryStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  patientProfile: Patient
  patientHistory: Patient[]
  codeSets: CodeSet[]
  raceAndEthnicityCodeSet: AuthorityCodeSets
  usStatesCodeSet: AuthorityCodeSets
  degreeCodeSet: AuthorityCodeSets
  hl7v3CodeSets: AuthorityNameSpace[]
}

const Preloader = ({
  store,
  patientProfile,
  patientHistory,
  codeSets,
  raceAndEthnicityCodeSet,
  usStatesCodeSet,
  degreeCodeSet,
  hl7v3CodeSets,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const {
    setPatient,
    setPatientHistory,
    setCodeSets,
    setRaceAndEthnicityCodeSets,
    setUsStatesCodeSet,
    setDegreeCodeSets,
    setHlv3CodeSets,
  } = store((state) => ({
    setPatient: state.setPatient,
    setPatientHistory: state.setPatientHistory,
    setCodeSets: state.setCodeSets,
    setRaceAndEthnicityCodeSets: state.setRaceAndEthnicityCodeSets,
    setUsStatesCodeSet: state.setUsStatesCodeSets,
    setDegreeCodeSets: state.setDegreeCodeSets,
    setHlv3CodeSets: state.setHlv3CodeSets,
  }))

  if (!loaded.current) {
    loaded.current = true
    setPatient(patientProfile)
    setPatientHistory(patientHistory)
    setCodeSets(codeSets)
    setRaceAndEthnicityCodeSets(raceAndEthnicityCodeSet)
    setUsStatesCodeSet(usStatesCodeSet)
    setDegreeCodeSets(degreeCodeSet)
    setHlv3CodeSets(hl7v3CodeSets)
  }

  return null
}

export { Preloader }
