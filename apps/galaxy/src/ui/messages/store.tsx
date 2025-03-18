'use client'

import { createContext, useContext, useRef } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore, type StoreApi } from 'zustand'
import { createStore as zustandCreateStore } from 'zustand/vanilla'
import { getStaffNotesAction } from '../notes/actions'
import { getEmrDirectAccountStatus } from '../secure-messages/client-actions/get-emr-direct-account-status'
import { getUnreadCountAction } from '../secure-messages/client-actions/get-unread-count'
import { Tabs, type Store, type StoreInitialState } from './types'

const createStore = (initialState: StoreInitialState) =>
  zustandCreateStore<Store>()((set, get) => ({
    visitedTabs: new Set([Tabs.PENDING_NOTES]),
    notesData: undefined,
    loading: true,
    activeTab: initialState.tab ?? Tabs.PENDING_NOTES,
    setActiveTab: (activeTab: string) => {
      const visitedTabs = get().visitedTabs
      visitedTabs.add(activeTab)
      set({ activeTab, visitedTabs })
    },
    unreadCount: 0,
    setUnreadCount: (unreadCount: number) => set({ unreadCount }),
    fetchUnreadCount: async () => {
      const result = await getUnreadCountAction()
      if (result.state === 'error') {
        toast.error(result.error || 'Failed to fetch unread messages count')
        return 0
      }
      const { count } = result.data
      set({ unreadCount: count })
      return count
    },
    isEmrDirectUser: undefined,
    fetchEmrDirectStatus: async () => {
      const result = await getEmrDirectAccountStatus()
      if (result.state === 'error') {
        toast.error(result.error || 'Failed to fetch EMR Direct status')
        return false
      }
      const { isEmrDirectUser } = result.data
      set({ isEmrDirectUser })
      return isEmrDirectUser
    },
    fetchNotes: async (status: string[]) => {
      set({ notesData: undefined, loading: true })
      const notes = await getStaffNotesAction({ status })
      if (notes.state === 'error') {
        set({ notesData: undefined, loading: false })
        toast.error(notes.error)
        return
      }
      set({ notesData: notes.data, loading: false })
    },
  }))

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

export { createStore, StoreProvider, useStore }
