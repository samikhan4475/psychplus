'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'

type StoreType = CodeSetState

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(createCodeSetStore),
  shallow,
)

export { useStore, type StoreType }
