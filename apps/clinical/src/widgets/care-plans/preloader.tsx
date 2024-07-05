'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { CarePlan, PatientParams, RealCodeSet } from '@psychplus/care-plans'
import { CarePlanStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<CarePlanStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  codeSets: RealCodeSet[]
  care_plans: CarePlan[]
}

const Preloader = ({
  store,
  codeSets,
  care_plans,
  patientId,
  noteId,
}: PreloaderProps & PatientParams) => {
  const loaded = useRef(false)

  const { setRealCodeSet, setcarePlans, setNoteId, setPatientId } = store(
    (state) => ({
      setcarePlans: state.setcarePlans,
      setPatientId: state.setPatientId,
      setNoteId: state.setNoteId,
      setRealCodeSet: state.setRealCodeSet,
    }),
  )

  if (!loaded.current) {
    loaded.current = true
    setcarePlans(care_plans)
    setPatientId(patientId)
    setNoteId(noteId)

    setRealCodeSet(codeSets)
  }

  return null
}

export { Preloader }
