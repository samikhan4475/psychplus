'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import {
  FunctionalCognitive,
  PatientParams,
  RealCodeSet,
} from '@psychplus/functional-cognitive'
import { FunctionalCognitiveStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<FunctionalCognitiveStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  codeSets: RealCodeSet[]
  functionalcognitives: FunctionalCognitive[]
}

const Preloader = ({
  store,
  codeSets,
  functionalcognitives,
  patientId,
  noteId,
}: PreloaderProps & PatientParams) => {
  const loaded = useRef(false)

  const { setFunctionalCognitives, setRealCodeSet, setPatientId, setNoteId } =
    store((state) => ({
      setFunctionalCognitives: state.setFunctionalCognitives,
      setRealCodeSet: state.setRealCodeSet,
      setPatientId: state.setPatientId,
      setNoteId: state.setNoteId,
    }))

  if (!loaded.current) {
    loaded.current = true
    setFunctionalCognitives(functionalcognitives)
    setPatientId(patientId)
    setNoteId(noteId)

    setRealCodeSet(codeSets)
  }

  return null
}

export { Preloader }
