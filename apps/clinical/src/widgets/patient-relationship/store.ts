'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'
import type { PatientRelationship } from '@psychplus/patient'
import { StateCreator } from 'zustand'
import { RelationshipCodeSet } from '@psychplus/codeset'

interface PatientRelationshipsState {
  patientRelationships: PatientRelationship[]
  setPatientRelationships: (value: PatientRelationship[]) => void
}

const createPatientRelationshipsStore: StateCreator<PatientRelationshipsState> = (set) => ({
  patientRelationships: [],
  setPatientRelationships: (patientRelationships) => set({ patientRelationships }),
})

interface RelationshipsCodesetState {
  relationshipsCodeset: RelationshipCodeSet
  setRelationshipsCodeset: (code: RelationshipCodeSet) => void
}

const createRelationshipCodesetStore: StateCreator<RelationshipsCodesetState> = (set) => ({
  relationshipsCodeset: {
    codeSystemName: '',
    displayName: '',
    codes: [],
  },
  setRelationshipsCodeset: (relationshipsCodeset: RelationshipCodeSet) => set({ relationshipsCodeset })
})

type PatientRelationshipsStoreType = UserState & PatientRelationshipsState & RelationshipsCodesetState

const useStore = createWithEqualityFn<PatientRelationshipsStoreType>(
  combineStateCreators(createUserStore, createPatientRelationshipsStore, createRelationshipCodesetStore),
  shallow,
)

export { useStore, type PatientRelationshipsStoreType }
