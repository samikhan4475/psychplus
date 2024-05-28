'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { CodeSetState, createCodeSetStore } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { patientFilterStore } from './patient-filter-store'
import { patientStore, preferredPartnerStore } from './patient-store'
import {
  PatientFiltersState,
  PatientState,
  PreferredPartnerIdState,
} from './types'

type PatientStoreType = PatientState &
  PatientFiltersState &
  PreferredPartnerIdState &
  CodeSetState

const useStore = createWithEqualityFn<PatientStoreType>(
  combineStateCreators(
    patientStore,
    patientFilterStore,
    preferredPartnerStore,
    createCodeSetStore,
  ),
  shallow,
)

export { useStore, type PatientStoreType }
