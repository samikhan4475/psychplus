'use client'

import { type StateCreator } from 'zustand'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { createPatientStore, type PatientState } from '@psychplus/patient'
import {
  createStaffStore,
  createUserStore,
  type StaffState,
  type UserState,
} from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'
import type { Referral } from './types'

interface State {
  referrals: Referral[]
  setReferrals: (value: Referral[]) => void
}

const createStore: StateCreator<State> = (set) => ({
  referrals: [],
  setReferrals: (referrals) => set({ referrals }),
})

type StoreType = UserState & StaffState & PatientState & CodeSetState & State

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(
    createStore,
    createUserStore,
    createStaffStore,
    createPatientStore,
    createCodeSetStore,
  ),
  shallow,
)

export { useStore, type StoreType }
