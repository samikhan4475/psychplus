'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { immunizationStore, realCodeSetStore } from '.'
import { ImmunizationStoreType } from './types'

const useStore = createWithEqualityFn<ImmunizationStoreType>(
  combineStateCreators(immunizationStore, realCodeSetStore),
  shallow,
)

export { useStore }
