'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'
import {
  createFeeSchedulesStore,
  type FeeSchedulesState,
} from './fee-schedules-store'

type Store = UserState & FeeSchedulesState

const useStore = createWithEqualityFn<Store>(
  combineStateCreators(createUserStore, createFeeSchedulesStore),
  shallow,
)

export { useStore }
