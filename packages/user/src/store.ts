'use client'

import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import type { Staff, User } from './types'

interface UserState {
  user?: User
  setUser: (user: User) => void
}

type UserStoreType = UseBoundStore<StoreApi<UserState>>

const createUserStore: StateCreator<UserState> = (set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
})

interface StaffState {
  staff?: Staff
  setStaff: (staff: Staff) => void
}

type StaffStoreType = UseBoundStore<StoreApi<StaffState>>

const createStaffStore: StateCreator<StaffState> = (set) => ({
  staff: undefined,
  setStaff: (staff) => set({ staff }),
})

export {
  type UserState,
  type StaffState,
  type UserStoreType,
  type StaffStoreType,
  createUserStore,
  createStaffStore,
}
