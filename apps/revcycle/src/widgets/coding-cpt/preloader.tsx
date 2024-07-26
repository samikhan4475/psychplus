'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { CodingCPTType } from './store'
import {  MetaDataCodeSet } from './types'

type BoundStoreType = UseBoundStore<StoreApi<CodingCPTType>>

interface PreloaderProps {
  store: BoundStoreType
  posCodeSets: MetaDataCodeSet[]
}

const Preloader = ({ store, posCodeSets }: PreloaderProps) => {
  const loaded = useRef(false)
  const { setCodingPosCodeSets } = store((state) => ({
    setCodingPosCodeSets: state.setCodingPosCodeSets,
  }))

  if (!loaded.current) {
    loaded.current = true
    setCodingPosCodeSets(posCodeSets)
  }

  return null
}

export { Preloader }
