'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'
import {
  createProfessionalClaimStore,
  type ProfessionalClaimState,
} from './professional-claim-store'

type Store = UserState & ProfessionalClaimState

const useStore = createWithEqualityFn<Store>(
  combineStateCreators(createUserStore, createProfessionalClaimStore),
  shallow,
)

export { useStore }
