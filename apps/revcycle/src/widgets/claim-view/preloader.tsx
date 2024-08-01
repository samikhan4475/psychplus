'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { ClaimStoreType } from './store'
import { Claim } from './types'

type BoundStoreType = UseBoundStore<StoreApi<ClaimStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  claimsList: Claim[]
}

const Preloader = ({ store, claimsList }: PreloaderProps) => {
  const loaded = useRef(false)
  const { setClaimList } = store((state) => ({
    setClaimList: state.setClaimList,
  }))

  if (!loaded.current) {
    loaded.current = true
    setClaimList(claimsList)
  }

  return null
}

export { Preloader }
