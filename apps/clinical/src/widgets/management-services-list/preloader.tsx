'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type Service } from '@psychplus/management-services'
import { SerivcesStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<SerivcesStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  services: Service[]
}

const Preloader = ({ store, services }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setServices } = store((state) => ({
    setServices: state.setServices,
  }))

  if (!loaded.current) {
    loaded.current = true
    setServices(services)
  }

  return null
}

export { Preloader }
