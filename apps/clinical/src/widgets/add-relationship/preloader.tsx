'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type CodeSet } from '@psychplus/codeset'
import { type Patient } from '@psychplus/patient'
import { type User } from '@psychplus/user'
import { type StoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<StoreType>>

interface PreloaderProps {
  store: BoundStoreType
  user: User
  patient: Patient
  codeSets: CodeSet[]
}

const Preloader = ({
  store,
  user,
  patient,
  codeSets,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const { setUser, setPatient, setCodeSets } = store(
    (state) => ({
      setUser: state.setUser,
      setPatient: state.setPatient,
      setCodeSets: state.setCodeSets,
    }),
  )

  if (!loaded.current) {
    loaded.current = true
    setUser(user)
    setPatient(patient)
    setCodeSets(codeSets)
  }

  return null
}

export { Preloader }
