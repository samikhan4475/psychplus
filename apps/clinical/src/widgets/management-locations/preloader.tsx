'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type Location } from '@psychplus/management-locations/types'
import { LocationsStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<LocationsStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  locations: Location[]
}

const Preloader = ({ store, locations }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setLocations } = store((state) => ({
    setLocations: state.setLocations,
  }))

  if (!loaded.current) {
    loaded.current = true
    setLocations(locations)
  }

  return null
}

export { Preloader }
