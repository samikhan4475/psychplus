'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import {createUsStatesCodeSetsStore, UsStatesCodeSetsState } from '@psychplus/patient-info'
import { combineStateCreators } from '@psychplus/utils/store'



type StoreType = UsStatesCodeSetsState

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(createUsStatesCodeSetsStore),
  shallow,
)

export { useStore, type StoreType }