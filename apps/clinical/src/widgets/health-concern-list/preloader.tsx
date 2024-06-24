'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type CodeSet } from '@psychplus/codeset'
import { type HealthConcern } from '@psychplus/health-concerns/types'
import { HealthConcernsStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<HealthConcernsStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  codeSets: CodeSet[]
  healthConcerns: HealthConcern[]
  patientId: number
  noteId: number
}

const Preloader = ({
  store,
  codeSets,
  healthConcerns,
  patientId,
  noteId,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const { setCodeSets, setHealthConcerns, setPatientId, setNoteId } = store(
    (state) => ({
      setCodeSets: state.setCodeSets,
      setHealthConcerns: state.setHealthConcerns,
      setPatientId: state.setPatientId,
      setNoteId: state.setNoteId,
    }),
  )

  if (!loaded.current) {
    loaded.current = true
    setCodeSets(codeSets)
    setHealthConcerns(healthConcerns)
    setPatientId(patientId)
    setNoteId(noteId)
  }

  return null
}

export { Preloader }
