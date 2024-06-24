'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { HealthConcernsDialogStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<HealthConcernsDialogStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  patientId: number
  noteId: number
}

const Preloader = ({ store, patientId, noteId }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setPatientId, setNoteId } = store((state) => ({
    setPatientId: state.setPatientId,
    setNoteId: state.setNoteId,
  }))

  if (!loaded.current) {
    loaded.current = true
    setPatientId(patientId)
    setNoteId(noteId)
  }

  return null
}

export { Preloader }
