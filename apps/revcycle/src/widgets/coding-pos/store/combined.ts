'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { codingPosStore } from './pos-code-set-store'

type CodeSetStoreType = CodeSetState

const useStore = createWithEqualityFn<CodeSetStoreType>(
  combineStateCreators(codingPosStore, createCodeSetStore),
  shallow,
)

export { useStore, type CodeSetStoreType }
