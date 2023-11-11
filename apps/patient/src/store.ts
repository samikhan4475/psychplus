'use client'

import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/store/utils'

type StoreType = CodeSetState

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(createCodeSetStore),
  shallow,
)

export { useStore }
