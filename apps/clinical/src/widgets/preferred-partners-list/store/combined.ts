'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, CodeSetState } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { preferredPartnerFilterStore } from './preferred-partner-filter-store'
import { preferredPartnerStore } from './preferred-partner-store'
import { PreferredPartnerFiltersState, PreferredPartnerState } from './types'

type PreferredPartnersStoreType = CodeSetState &
  PreferredPartnerState &
  PreferredPartnerFiltersState

const useStore = createWithEqualityFn<PreferredPartnersStoreType>(
  combineStateCreators(
    preferredPartnerStore,
    preferredPartnerFilterStore,
    createCodeSetStore,
  ),
  shallow,
)

export { useStore, type PreferredPartnersStoreType }
