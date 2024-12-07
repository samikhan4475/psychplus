import { create } from 'zustand'
import { OrganizationPracticeTab } from './types'

type Tab = OrganizationPracticeTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  setActiveTab: (tab: Tab) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: OrganizationPracticeTab.ORGANIZATIONS,
  viewedTabs: new Set([OrganizationPracticeTab.ORGANIZATIONS]),
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
