import { create } from 'zustand'
import { ScreeningTabs } from './constants'

interface Store {
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
  isErrorAlertOpen: boolean
  setIsErrorAlertOpen: (value: boolean) => void
  errorMessage: string
  setErrorMessage: (value: string) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: ScreeningTabs.UDS,
  viewedTabs: new Set([ScreeningTabs.UDS]),
  isErrorAlertOpen: false,
  errorMessage: '',
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setIsErrorAlertOpen: (isErrorAlertOpen) => set({ isErrorAlertOpen }),
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)

    set({
      activeTab,
      viewedTabs,
    })
  },
}))

export { useStore }
