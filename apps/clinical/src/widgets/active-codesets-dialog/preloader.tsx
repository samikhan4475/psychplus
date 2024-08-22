'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { ActiveCodeSetsDialogStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<ActiveCodeSetsDialogStoreType>>

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
