'use client'

import { createCodeSetStore } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { clearingHouseSubmitterStore } from './submitter-set-store'
import { SubmitterSetState } from './types'
type SubmitterType = SubmitterSetState

const useStore = createWithEqualityFn<SubmitterSetState>(
  combineStateCreators(
    clearingHouseSubmitterStore,
    createCodeSetStore
  ),
  shallow,
)

export { useStore, type SubmitterType }
