'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type User } from '@psychplus/user'
import { type PatientRelationshipsStoreType } from './store'
import { type PatientRelationship } from '@psychplus/patient'
import { RelationshipCodeSet } from '@psychplus/codeset'

type BoundStoreType = UseBoundStore<StoreApi<PatientRelationshipsStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  user: User
  patientRelationships: PatientRelationship[]
  relationshipsCodeset: RelationshipCodeSet
}

const Preloader = ({ store, user, patientRelationships, relationshipsCodeset }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setUser, setPatientRelationships, setRelationshipsCodeset } = store((state) => ({
    setUser: state.setUser,
    setPatientRelationships: state.setPatientRelationships,
    setRelationshipsCodeset: state.setRelationshipsCodeset,
  }))

  if (!loaded.current) {
    loaded.current = true
    setUser(user)
    setPatientRelationships(patientRelationships)
    setRelationshipsCodeset(relationshipsCodeset)
  }

  return null
}

export { Preloader }
