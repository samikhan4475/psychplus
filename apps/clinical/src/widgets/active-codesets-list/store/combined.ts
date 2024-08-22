'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { CodeSetsStoreType } from '.'
import {
  authorityStore,
  codeErrorStore,
  codeSetStore,
  codeStore,
} from './active-codeset-store'

const useStore = createWithEqualityFn<CodeSetsStoreType>(
  combineStateCreators(codeSetStore, codeErrorStore, codeStore, authorityStore),
  shallow,
)

export { useStore }
