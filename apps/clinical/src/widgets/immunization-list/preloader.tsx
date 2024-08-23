'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { Immunization, RealCodeSet } from '@psychplus/immunization'
import { ImmunizationStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<ImmunizationStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  codeSets?: RealCodeSet[]
  immunizations?: Immunization[]
}

const Preloader = ({
  store,
  codeSets,
  immunizations,
  appointmentId,
}: PreloaderProps & { appointmentId: number }) => {
  const loaded = useRef(false)

  const { setRealCodeSet, setImmunizations, setAppointmentId } = store(
    (state) => ({
      setRealCodeSet: state.setRealCodeSet,
      setImmunizations: state.setImmunizations,
      setAppointmentId: state.setAppointmentId,
    }),
  )

  if (!loaded.current) {
    loaded.current = true
    setRealCodeSet(codeSets ?? [])
    setImmunizations(immunizations ?? [])
    setAppointmentId(appointmentId)
  }

  return null
}

export { Preloader }
