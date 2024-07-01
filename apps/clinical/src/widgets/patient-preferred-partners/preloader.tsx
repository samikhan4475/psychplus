'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
// import { type CodeSet } from '@psychplus/codeset'
import { type User } from '@psychplus/user'
import { type PreferredPartnersStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<PreferredPartnersStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  user: User
}

const Preloader = ({ store, user }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setUser } = store((state) => ({
    setUser: state.setUser,
  }))

  if (!loaded.current) {
    loaded.current = true
    setUser(user)
  }

  return null
}

export { Preloader }
