'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { AuthorityCodeSets } from '@psychplus/patient-info'
import { StoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<StoreType>>

interface PreloaderProps {
  store: BoundStoreType
  usStatesCodeSet: AuthorityCodeSets
}

const Preloader = ({ store, usStatesCodeSet }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setUsStatesCodeSets } = store((state) => ({
    setUsStatesCodeSets: state.setUsStatesCodeSets,
  }))

  if (!loaded.current) {
    loaded.current = true

    setUsStatesCodeSets(usStatesCodeSet)
  }

  return null
}

export { Preloader }
