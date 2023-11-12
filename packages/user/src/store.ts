'use client'

import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import { type User } from './types'

interface UserState {
  user?: User
  getUser: () => User
  setUser: (user: User) => void
}

type UserStoreType = UseBoundStore<StoreApi<UserState>>

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

export { type UserState, type UserStoreType, createUserStore }
