import { create } from 'zustand'
import { CodingTab } from './types'

type Tab = CodingTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  setActiveTab: (tab: Tab) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: CodingTab.CPT,
  viewedTabs: new Set([CodingTab.CPT]),
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
