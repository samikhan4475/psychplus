'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { CodeSet } from '@psychplus/codeset'
import {
  PreferredPartnerPatient,
  PreferredPartnerWorklist,
} from '@psychplus/preferred-partners'
import { PreferredPartnerPatientStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<PreferredPartnerPatientStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  codeSets: CodeSet[]
  preferredPartnerPatient: PreferredPartnerPatient[]
  preferredPartnerWorklist: PreferredPartnerWorklist[]
  preferredPartnerId: string
}

const Preloader = ({
  store,
  codeSets,
  preferredPartnerPatient,
  preferredPartnerWorklist,
  preferredPartnerId,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const {
    setCodeSets,
    setPreferredPartnerPatient,
    setPreferredPartnerWorklist,
    setPreferredPartnerId,
  } = store((state) => ({
    setCodeSets: state.setCodeSets,
    setPreferredPartnerPatient: state.setPreferredPartnerPatient,
    setPreferredPartnerWorklist: state.setPreferredPartnerWorklist,
    setPreferredPartnerId: state.setPreferredPartnerId,
  }))

  if (!loaded.current) {
    loaded.current = true
    setCodeSets(codeSets)
    setPreferredPartnerPatient(preferredPartnerPatient)
    setPreferredPartnerWorklist(preferredPartnerWorklist)
    setPreferredPartnerId(preferredPartnerId)
  }

  return null
}

export { Preloader }
