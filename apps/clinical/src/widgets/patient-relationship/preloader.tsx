'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type User } from '@psychplus/user'
import { type LinkAccountStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<LinkAccountStoreType>>

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
