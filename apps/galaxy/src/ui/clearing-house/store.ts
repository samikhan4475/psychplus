import { create } from 'zustand'
import { ClearingHouseTab } from './types'

type Tab = ClearingHouseTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  setActiveTab: (tab: Tab) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: ClearingHouseTab.Receiver,
  viewedTabs: new Set([ClearingHouseTab.Receiver]),
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)
    set({
      activeTab: activeTab,
      viewedTabs,
    })
  },
}))

export { useStore }
