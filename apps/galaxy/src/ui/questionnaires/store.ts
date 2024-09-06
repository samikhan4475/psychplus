import { create } from 'zustand'
import { DASHBOARD_TAB } from './constants'

interface Store {
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: DASHBOARD_TAB,
  viewedTabs: new Set([DASHBOARD_TAB]),
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
