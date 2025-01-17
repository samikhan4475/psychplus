import { createContext } from 'react'
import { createStore as zustandCreateStore } from 'zustand'
import { PATIENT_INFO_HISTORY_TAB, PATIENT_INFO_TAB } from '../constants'

interface StoreState {
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
  showPatientHistory: boolean
  openPatientHistory: () => void
  closePatientHistory: () => void
  isUserLocked: boolean
  toggleUserLock: () => void
  setUserLock: (lockStatus: boolean) => void; 
}

type Store = ReturnType<typeof createStore>

const createStore = () => {
  return zustandCreateStore<StoreState>()((set, get) => ({
    isUserLocked: true,
    toggleUserLock: () =>
      set((state) => ({ isUserLocked: !state.isUserLocked })),
    activeTab: PATIENT_INFO_TAB,
    viewedTabs: new Set([PATIENT_INFO_TAB]),
    setActiveTab: (activeTab) => {
      const viewedTabs = get().viewedTabs
      viewedTabs.add(activeTab)

      set({
        activeTab,
        viewedTabs,
      })
    },
    showPatientHistory: false,
    openPatientHistory: () => {
      set({
        activeTab: PATIENT_INFO_HISTORY_TAB,
        showPatientHistory: true,
      })
    },
    setUserLock: (lockStatus: boolean) => set(() => ({ isUserLocked: lockStatus })),
    closePatientHistory: () => {
      set({
        activeTab:
          get().activeTab === PATIENT_INFO_HISTORY_TAB
            ? PATIENT_INFO_TAB
            : get().activeTab,
        showPatientHistory: false,
      })
    },
  }))
}

const StoreContext = createContext<Store | null>(null)

export { createStore, StoreContext, type Store }
