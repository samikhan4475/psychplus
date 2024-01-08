'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type CodeSet } from '@psychplus/codeset'
import { type StoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<StoreType>>

interface PreloaderProps {
  store: BoundStoreType
  codeSets: CodeSet[]
}

const Preloader = ({ store, codeSets }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setCodeSets } = store((state) => ({
    setCodeSets: state.setCodeSets,
  }))

  if (!loaded.current) {
    loaded.current = true
    setCodeSets(codeSets)
  }

  return null
}

export { Preloader }
