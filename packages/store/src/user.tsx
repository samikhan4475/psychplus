'use client'

import { useRef } from 'react'
import type { StateCreator, StoreApi, UseBoundStore } from 'zustand'
import type { User } from '@psychplus/types'

interface UserState {
  user?: User
  setUser: (user: User) => void
}

type StoreType = UseBoundStore<StoreApi<UserState>>

const createUserStore: StateCreator<UserState> = (set) => ({
  setUser: (user) => set({ user }),
})

const UserPreloader = ({ user, store }: { user: User; store: StoreType[] }) => {
  const loaded = useRef(false)
  const setters = store.map((s) => s((state) => state.setUser))

  if (!loaded.current) {
    loaded.current = true
    setters.forEach((set) => set(user))
  }

  return null
}

const getUser = (store: StoreType) => {
  const user = store((state) => state.user)

  if (!user) {
    throw new Error()
  }

  return user
}

export { type UserState, createUserStore, UserPreloader, getUser }
