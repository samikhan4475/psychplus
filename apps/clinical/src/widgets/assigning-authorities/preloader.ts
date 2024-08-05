'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type AssigningAuthorities } from '@psychplus/codeset'
import { AssigningAuthoritiesStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<AssigningAuthoritiesStoreType>>

interface PreloaderProps {
  store: BoundStoreType

  assigningAuthorities: AssigningAuthorities[]
}

const Preloader = ({ store, assigningAuthorities }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setAssigningAuthorities } = store((state) => ({
    setAssigningAuthorities: state.setAssigningAuthorities,
  }))

  if (!loaded.current) {
    loaded.current = true

    setAssigningAuthorities(assigningAuthorities)
  }

  return null
}

export { Preloader }
