'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { createPOSCodeSetsStore, POSCodeSetsState } from './pos-code-set-store'

type CodeSetStoreType = POSCodeSetsState

const useStore = createWithEqualityFn<CodeSetStoreType>(
  combineStateCreators(createPOSCodeSetsStore),
  shallow,
)

export { useStore, type CodeSetStoreType }
