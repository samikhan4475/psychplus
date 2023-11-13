'use client'

import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import { type User } from './types'

interface UserState {
  user?: User
  setUser: (user: User) => void
}

type UserStoreType = UseBoundStore<StoreApi<UserState>>

const createUserStore: StateCreator<UserState> = (set, get) => ({
  user: undefined,
  setUser: (user) => set({ user }),
})

export { type UserState, type UserStoreType, createUserStore }
