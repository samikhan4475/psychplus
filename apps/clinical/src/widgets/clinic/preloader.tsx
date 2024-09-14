'use client'

import { useRef } from 'react'
import { StoreApi, UseBoundStore } from 'zustand'
import { CodeSet } from '@psychplus/codeset'
import { AuthorityCodeSets } from '@psychplus/patient-info'
import { AppointmentAvailabilityStoreType } from './store'
import { AppointmentAvailability, Provider } from './types'

type BoundStoreType = UseBoundStore<StoreApi<AppointmentAvailabilityStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  usStatesCodeSet: AuthorityCodeSets
  codeSets: CodeSet[]
  languagesCodeSet: AuthorityCodeSets
  providers: Provider[]
  appointmentAvailabilitiesServer: AppointmentAvailability[]
}

const Preloader = ({
  store,
  usStatesCodeSet,
  codeSets,
  languagesCodeSet,
  providers,
  appointmentAvailabilitiesServer
}: PreloaderProps) => {
  const loaded = useRef(false)

  const {
    setUsStatesCodeSets,
    setCodeSets,
    setAppointmentDates,
    setLanguageCodeSets,
    setProviders,
    setAppointmentAvailabilitiesServer
  } = store((state) => ({
    setUsStatesCodeSets: state.setUsStatesCodeSets,
    setCodeSets: state.setCodeSets,
    setAppointmentDates: state.setAppointmentDates,
    setLanguageCodeSets: state.setLanguageCodeSets,
    setProviders: state.setProviders,
    setAppointmentAvailabilitiesServer: state.setAppointmentAvailabilities
  }))

  if (!loaded.current) {
    loaded.current = true
    const currentDate = new Date()
    setUsStatesCodeSets(usStatesCodeSet)
    setCodeSets(codeSets)
    setAppointmentDates(currentDate)
    setLanguageCodeSets(languagesCodeSet)
    setProviders(providers)
    setAppointmentAvailabilitiesServer(appointmentAvailabilitiesServer)
  }

  return null
}

export { Preloader }
