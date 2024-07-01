'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { createPatientStore, type PatientState } from '@psychplus/patient'
import {
  createUserStore,
  type StaffState,
  type UserState,
} from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'



type StoreType = UserState & StaffState & PatientState & CodeSetState

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(
    createUserStore,
    createPatientStore,
    createCodeSetStore,
  ),
  shallow,
)

export { useStore, type StoreType }
