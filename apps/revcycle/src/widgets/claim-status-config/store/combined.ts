'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'
import {
  createClaimStatusConfigStore,
  type ClaimStatusConfigState,
} from './claim-status-config-store'

type Store = UserState & ClaimStatusConfigState

const useStore = createWithEqualityFn<Store>(
  combineStateCreators(createUserStore, createClaimStatusConfigStore),
  shallow,
)

export { useStore }
