'use client'

import { useRef } from 'react'
import type { StateCreator, StoreApi, UseBoundStore } from 'zustand'
import type { User } from '@psychplus/types'

interface UserState {
  user?: User
  getUser: () => User
  setUser: (user: User) => void
}

type StoreType = UseBoundStore<StoreApi<UserState>>

const createUserStore: StateCreator<UserState> = (set, get) => ({
  getUser: () => {
    const user = get().user

    if (!user) {
      throw new Error()
    }

    return user
  },
  setUser: (user) => set({ user }),
})

const UserPreloader = ({ user, store }: { user: User; store: StoreType[] }) => {
  const loaded = useRef(false)

  if (!loaded.current) {
    loaded.current = true

    const setters = store.map((s) => s((state) => state.setUser))
    setters.forEach((set) => set(user))
  }

  return null
}

export { type UserState, createUserStore, UserPreloader }
