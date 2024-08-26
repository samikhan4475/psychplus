'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { LocationsStoreType } from '.'
import { locationStore } from './locations-store'

const useStore = createWithEqualityFn<LocationsStoreType>(
  combineStateCreators(createCodeSetStore, locationStore),
  shallow,
)

export { useStore }
