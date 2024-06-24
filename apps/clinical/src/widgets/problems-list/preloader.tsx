'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { PatientParams, Problem, RealCodeSet } from '@psychplus/problems'
import { ProblemStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<ProblemStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  codeSets: RealCodeSet[]
  problems: Problem[]
}

const Preloader = ({
  store,
  codeSets,
  problems,
  patientId,
  noteId,
}: PreloaderProps & PatientParams) => {
  const loaded = useRef(false)

  const { setRealCodeSet, setProblems, setNoteId, setPatientId } = store(
    (state) => ({
      setProblems: state.setProblems,
      setRealCodeSet: state.setRealCodeSet,
      setPatientId: state.setPatientId,
      setNoteId: state.setNoteId,
    }),
  )

  if (!loaded.current) {
    loaded.current = true
    setProblems(problems)
    setPatientId(patientId)
    setNoteId(noteId)

    setRealCodeSet(codeSets)
  }

  return null
}

export { Preloader }
