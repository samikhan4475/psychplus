'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { PreferredPartnerIdState } from '@/widgets/link-user-dialog/store'
import { preferredPartnertPatientStore } from './preferred-partner-patient-store'
import {
  preferredPartnerStore,
  preferredPartnerWorklistStore,
} from './preferred-partner-worklist-store'
import {
  PreferredPartnerPatientState,
  PreferredPartnerWorklistState,
} from './types'

type PreferredPartnerPatientStoreType = PreferredPartnerPatientState &
  PreferredPartnerWorklistState &
  CodeSetState &
  PreferredPartnerIdState

const useStore = createWithEqualityFn<PreferredPartnerPatientStoreType>(
  combineStateCreators(
    preferredPartnertPatientStore,
    preferredPartnerWorklistStore,
    createCodeSetStore,
    preferredPartnerStore,
  ),
  shallow,
)

export { useStore, type PreferredPartnerPatientStoreType }
