'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type CodeSet } from '@psychplus/codeset'
import { PreferredPartner } from '@psychplus/preferred-partners'
import { type PreferredPartnersStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<PreferredPartnersStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  codeSets: CodeSet[]
  preferredPartners: PreferredPartner[]
}

const Preloader = ({ store, codeSets, preferredPartners }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setCodeSets, setPreferredPartners } = store((state) => ({
    setCodeSets: state.setCodeSets,
    setPreferredPartners: state.setPreferredPartners,
  }))

  if (!loaded.current) {
    loaded.current = true
    setCodeSets(codeSets)
    setPreferredPartners(preferredPartners)
  }

  return null
}

export { Preloader }
