'use client'

import { type StateCreator } from 'zustand'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import type { Referral } from '@psychplus/referrals'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'

interface State {
  referrals: Referral[]
  setReferrals: (value: Referral[]) => void
}

const createStore: StateCreator<State> = (set) => ({
  referrals: [],
  setReferrals: (referrals) => set({ referrals }),
})

type ReferralsStoreType = UserState & CodeSetState & State

const useStore = createWithEqualityFn<ReferralsStoreType>(
  combineStateCreators(createStore, createUserStore, createCodeSetStore),
  shallow,
)

export { useStore, type ReferralsStoreType }
