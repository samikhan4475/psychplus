'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { SerivcesStoreType } from '.'
import { serviceStore } from './service-store'

const useStore = createWithEqualityFn<SerivcesStoreType>(
  combineStateCreators(createCodeSetStore, serviceStore),
  shallow,
)

export { useStore }
