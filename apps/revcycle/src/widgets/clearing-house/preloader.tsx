'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { ClearingHouseStoreType } from './store'
import { RaceAndEthnicityCodeSet, StatesOption } from './types'

type BoundStoreType = UseBoundStore<StoreApi<ClearingHouseStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  usStatesCodeSet: RaceAndEthnicityCodeSet
}

const Preloader = ({ store, usStatesCodeSet }: PreloaderProps) => {
  const loaded = useRef(false)
  const { setUsStatesCodeSet } = store((state) => ({
    setUsStatesCodeSet: state.setUsStatesCodeSets,
  }))

  if (!loaded.current) {
    loaded.current = true

    const optionsList: StatesOption[] = []
    for (let index = 0; index < usStatesCodeSet.codes.length; index++) {
      const state = usStatesCodeSet.codes[index]
      optionsList.push({ value: state.displayName, label: state.displayName })
    }
    setUsStatesCodeSet(optionsList)
  }

  return null
}

export { Preloader }
