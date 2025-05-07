'use client'

import { createContext, useContext, useRef } from 'react'
import { CallAdapter } from '@azure/communication-react'
import { useStore as zustandUseStore, type StoreApi } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createStore as zustandCreateStore } from 'zustand/vanilla'
import { getFeatureFlagAction } from '@/actions/get-feature-flag'
import { FLAG_EXPIRY_MS, GALAXY_APP_LOCAL_STORAGE_KEY } from '@/constants'
import type {
  CodesetCache,
  Constants,
  FeatureFlagData,
  RolePermission,
  StaffResource,
  UserResponse as User,
  WebSocketEvents,
  WebSocketEventType,
} from '@/types'
import { AcsInfo } from '@/ui/call/types'

interface NavigationTab {
  href: string
  label: string
}

interface Store {
  user: User
  staffResource: StaffResource
  codesets: CodesetCache
  permissions: Record<string, RolePermission>
  featureFlags?: Record<string, FeatureFlagData>
  constants: Constants
  tabs: NavigationTab[]
  addTab: (tab: NavigationTab) => void
  removeTab: (name: string) => void
  updateTab: (tab: NavigationTab) => void
  checkFeatureFlag: (shortName: string) => boolean | undefined
  fetchFeatureFlag: (shortName: string) => Promise<boolean>

  // calling feature states
  currentCall: {
    acsInfo: AcsInfo
    appointment?: WebSocketEvents[WebSocketEventType.CallWaiting]
  } | null
  setCurrentCall: (
    callInfo: {
      acsInfo: AcsInfo
      appointment?: WebSocketEvents[WebSocketEventType.CallWaiting]
    } | null,
  ) => void
  callAdapter: CallAdapter | undefined
  setCallAdapter: (callAdapter?: CallAdapter) => void
  appoinmentList: WebSocketEvents[WebSocketEventType.CallWaiting][] | undefined
  setAppoinmentList: (
    appoinmentList: WebSocketEvents[WebSocketEventType.CallWaiting][],
  ) => void
}

interface StoreInitialState {
  user: User
  staffResource: StaffResource
  codesets: CodesetCache
  permissions: Record<string, RolePermission>
  featureFlags?: Record<string, FeatureFlagData>
  constants: Constants
}

const createStore = (initialState: StoreInitialState) =>
  zustandCreateStore<Store>()(
    persist(
      (set, get) => ({
        codesets: initialState.codesets,
        permissions: initialState.permissions,
        featureFlags: initialState.featureFlags,
        constants: initialState.constants,
        user: initialState.user,
        staffResource: initialState.staffResource,
        tabs: [],
        addTab: (tab) => set(addTabReducer(tab)),
        removeTab: (name) => set(removeTabReducer(name)),
        updateTab: (tab) => set(updateTabReducer(tab)),
        checkFeatureFlag: (shortName) => {
          const flag = get().featureFlags?.[shortName]
          return flag && flag.expiry > Date.now() ? flag.enabled : undefined
        },
        fetchFeatureFlag: async (shortName) => {
          const response = await getFeatureFlagAction(shortName)
          let enabled = false
          if (response.state === 'success') {
            enabled = response.data
          }
          const expiry = Date.now() + FLAG_EXPIRY_MS
          set((state) => ({
            featureFlags: {
              ...state.featureFlags,
              [shortName]: { enabled, expiry },
            },
          }))

          return enabled
        },
        appoinmentList: undefined,
        setAppoinmentList: (appoinmentList) => set(() => ({ appoinmentList })),
        currentCall: null,
        setCurrentCall: (currentCall) => set(() => ({ currentCall })),
        callAdapter: undefined,
        setCallAdapter: (callAdapter) => set(() => ({ callAdapter })),
       
      }),
      {
        name: GALAXY_APP_LOCAL_STORAGE_KEY,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          tabs: state.tabs,
          currentCall: state.currentCall,
        }),
      },
    ),
  )

const updateTabReducer =
  (tab: NavigationTab) =>
  (prev: Store): Partial<Store> => {
    return {
      tabs: prev.tabs.map((_tab) => (_tab.href === tab.href ? tab : _tab)),
    }
  }

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
