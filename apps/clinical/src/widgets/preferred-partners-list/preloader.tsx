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
  token: string
}

const Preloader = ({
  store,
  codeSets,
  preferredPartners,
  token,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const { setCodeSets, setPreferredPartners, setToken } = store((state) => ({
    setCodeSets: state.setCodeSets,
    setPreferredPartners: state.setPreferredPartners,
    setToken: state.setToken,
  }))

  if (!loaded.current) {
    loaded.current = true
    setCodeSets(codeSets)
    setPreferredPartners(preferredPartners)
    setToken(token)
  }

  return null
}

export { Preloader }
