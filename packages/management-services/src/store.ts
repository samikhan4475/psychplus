'use client'

import { StateCreator } from 'zustand'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { AuthorityCodeSets } from '@psychplus/management-services'
import { combineStateCreators } from '@psychplus/utils/store'

interface UsStatesCodeSetsState {
  usStatesCodeSets: AuthorityCodeSets
  setUsStatesCodeSets: (codes: AuthorityCodeSets) => void
}

const createUsStatesCodeSetsStore: StateCreator<UsStatesCodeSetsState> = (
  set,
) => ({
  usStatesCodeSets: {
    codeSystemName: '',
    displayName: '',
    codes: [],
  },
  setUsStatesCodeSets: (usStatesCodeSets: AuthorityCodeSets) =>
    set({ usStatesCodeSets }),
})

type ServiceStoreType = UsStatesCodeSetsState

const useStore = createWithEqualityFn<ServiceStoreType>(
  combineStateCreators(createUsStatesCodeSetsStore),
  shallow,
)

export { useStore, createUsStatesCodeSetsStore, type ServiceStoreType }
