'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { FunctionalCognitiveState, RealCodeSetState } from '.'
import {
  functionalCognitiveStore,
  realCodeSetStore,
} from './functional-cognitive-store'

type functionalcognitivesStoreType = RealCodeSetState & FunctionalCognitiveState

const useStore = createWithEqualityFn<functionalcognitivesStoreType>(
  combineStateCreators(functionalCognitiveStore, realCodeSetStore),
  shallow,
)

export { useStore, type functionalcognitivesStoreType }
