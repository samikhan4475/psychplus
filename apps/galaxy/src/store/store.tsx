'use client'

import { createContext, useContext, useRef } from 'react'
import { useStore as zustandUseStore, type StoreApi } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createStore as zustandCreateStore } from 'zustand/vanilla'
import { GALAXY_APP_LOCAL_STORAGE_KEY } from '@/constants'
import type { CodesetCache, UserResponse as User } from '@/types'

interface NavigationTab {
  href: string
  label: string
}

interface Store {
  user: User
  codesets: CodesetCache
  permissions: Record<string, boolean>
  tabs: NavigationTab[]
  addTab: (tab: NavigationTab) => void
  removeTab: (name: string) => void
}

interface StoreInitialState {
  user: User
  codesets: CodesetCache
  permissions: Record<string, boolean>
}

const createStore = (initialState: StoreInitialState) =>
  zustandCreateStore<Store>()(
    persist(
      (set, get) => ({
        codesets: initialState.codesets,
        permissions: initialState.permissions,
        user: initialState.user,
        tabs: [],
        addTab: (tab) => set(addTabReducer(tab)),
        removeTab: (name) => set(removeTabReducer(name)),
      }),
      {
        name: GALAXY_APP_LOCAL_STORAGE_KEY,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          tabs: state.tabs,
        }),
      },
    ),
  )

const addTabReducer =
  (tab: NavigationTab) =>
  (prev: Store): Partial<Store> => {
    if (prev.tabs.find((_tab) => _tab.href === tab.href)) {
      return {}
    }

    return {
      tabs: [...prev.tabs, tab],
    }
  }

const removeTabReducer =
  (name: string) =>
  (prev: Store): Partial<Store> => {
    return {
      tabs: prev.tabs.filter((tab) => tab.href !== name),
    }
  }

const StoreContext = createContext<StoreApi<Store> | undefined>(undefined)

const StoreProvider = ({
  children,
  ...initialState
}: React.PropsWithChildren<StoreInitialState>) => {
  const storeRef = useRef<StoreApi<Store>>()

  if (!storeRef.current) {
    storeRef.current = createStore(initialState)
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

const useStore = <T,>(selector: (store: Store) => T): T => {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error(`useStore must be use within StoreProvider`)
  }

  return zustandUseStore(context, selector)
}

export { StoreProvider, useStore }
