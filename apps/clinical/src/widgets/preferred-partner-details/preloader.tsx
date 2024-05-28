'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { PreferredPartner } from '@psychplus/preferred-partners'
import { type PreferredPartnersStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<PreferredPartnersStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  preferredPartner: PreferredPartner[]
}

const Preloader = ({ store, preferredPartner }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setPreferredPartner } = store((state) => ({
    setPreferredPartner: state.setPreferredPartner,
  }))

  if (!loaded.current) {
    loaded.current = true
    setPreferredPartner(preferredPartner)
  }

  return null
}

export { Preloader }
