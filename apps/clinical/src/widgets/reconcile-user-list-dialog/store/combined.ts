'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { PreferredPartnerIdState } from '@/widgets/link-user-dialog/store'
import {
  patientStore,
  preferredPartnerDetailStore,
  preferredPartnerStore,
} from './reconcile-user-store'
import { PatientState, PreferredPartnerState } from './types'

type PatientStoreType = PatientState &
  PreferredPartnerIdState &
  PreferredPartnerState

const useStore = createWithEqualityFn<PatientStoreType>(
  combineStateCreators(
    preferredPartnerStore,
    patientStore,
    preferredPartnerDetailStore,
  ),
  shallow,
)

export { useStore, type PatientStoreType }
