'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { AssigningAuthoritiesStore } from './assigning-authorities-store'
import { AssigningAuthoritiesStoreType } from './types'

const useStore = createWithEqualityFn<AssigningAuthoritiesStoreType>(
  combineStateCreators(AssigningAuthoritiesStore),
  shallow,
)

export { useStore }
