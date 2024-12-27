import { create } from 'zustand'
import { PracticeSettingsTab } from './types'

type Tab = PracticeSettingsTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  setActiveTab: (tab: Tab) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: PracticeSettingsTab.SCHEDULING,
  viewedTabs: new Set([PracticeSettingsTab.SCHEDULING]),
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
