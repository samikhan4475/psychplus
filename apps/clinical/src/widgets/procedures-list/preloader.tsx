'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { PatientParams } from '@psychplus/problems'
import { Procedure } from '@psychplus/procedures'
import { ProcedureStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<ProcedureStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  procedures: Procedure[]
}

const Preloader = ({
  store,
  procedures,
  patientId,
  noteId,
}: PreloaderProps & PatientParams) => {
  const loaded = useRef(false)

  const { setProcedures, setNoteId, setPatientId } = store((state) => ({
    setProcedures: state.setProcedures,
    setPatientId: state.setPatientId,
    setNoteId: state.setNoteId,
  }))

  if (!loaded.current) {
    loaded.current = true
    setProcedures(procedures)
    setPatientId(patientId)
    setNoteId(noteId)
  }

  return null
}

export { Preloader }
