'use client'

import { StateCreator } from 'zustand'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { RelationshipCodeSet } from '@psychplus/codeset'
import { createPatientStore, type PatientState } from '@psychplus/patient'
import {
  createUserStore,
  type StaffState,
  type UserState,
} from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'

interface RelationshipsCodesetState {
  relationshipsCodeset: RelationshipCodeSet
  setRelationshipsCodeset: (codes: RelationshipCodeSet) => void
}

const createRelationshipCodesetStore: StateCreator<
  RelationshipsCodesetState
> = (set) => ({
  relationshipsCodeset: {
    codeSystemName: '',
    displayName: '',
    codes: [],
  },
  setRelationshipsCodeset: (relationshipsCodeset: RelationshipCodeSet) =>
    set({ relationshipsCodeset }),
})

type StoreType = UserState &
  StaffState &
  PatientState &
  RelationshipsCodesetState

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(
    createUserStore,
    createPatientStore,
    createRelationshipCodesetStore,
  ),
  shallow,
)

export { useStore, type StoreType }
