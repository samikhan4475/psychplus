'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { preferredPartnerStore } from './preferred-partner-store'
import { PreferredPartnerState } from './types'

type PreferredPartnersStoreType = PreferredPartnerState

const useStore = createWithEqualityFn<PreferredPartnersStoreType>(
  combineStateCreators(preferredPartnerStore, createCodeSetStore),
  shallow,
)

export { useStore, type PreferredPartnersStoreType }
