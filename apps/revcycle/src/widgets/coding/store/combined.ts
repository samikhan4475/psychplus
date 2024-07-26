'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { createPOSCodeSetsStore, POSCodeSetsState } from './codesets-pos-store'

type CodingStoreType = POSCodeSetsState

const useStore = createWithEqualityFn<CodingStoreType>(
  combineStateCreators(createPOSCodeSetsStore),
  shallow,
)

export { useStore, type CodingStoreType }
