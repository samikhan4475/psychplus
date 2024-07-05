'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type RelationshipCodeSet } from '@psychplus/codeset'
import { type Patient } from '@psychplus/patient'
import { type User } from '@psychplus/user'
import { type StoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<StoreType>>

interface PreloaderProps {
  store: BoundStoreType
  user: User
  patient: Patient
  relationshipsCodeset: RelationshipCodeSet
}

const Preloader = ({
  store,
  user,
  patient,
  relationshipsCodeset,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const { setUser, setPatient, setRelationshipsCodeset } = store((state) => ({
    setUser: state.setUser,
    setPatient: state.setPatient,
    setRelationshipsCodeset: state.setRelationshipsCodeset,
  }))

  if (!loaded.current) {
    loaded.current = true
    setUser(user)
    setPatient(patient)
    setRelationshipsCodeset(relationshipsCodeset)
  }

  return null
}

export { Preloader }
