import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { StoreType } from '../types'
import { createSelfSchedulingStore } from './store'

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(createSelfSchedulingStore),
  shallow,
)

export { useStore }
