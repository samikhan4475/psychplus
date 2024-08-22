'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { ActiveCodeSetsDialogStoreType } from '.'
import { activeCodeSetDialogStore } from './active-codeset-dialog-store'

const useStore = createWithEqualityFn<ActiveCodeSetsDialogStoreType>(
  combineStateCreators(activeCodeSetDialogStore),
  shallow,
)

export { useStore }
