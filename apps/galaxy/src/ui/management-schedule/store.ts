import { create } from 'zustand'
import { ManagementScheduleTab } from './types'

type Tab = ManagementScheduleTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  setActiveTab: (tab: Tab) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: ManagementScheduleTab.AUTO_REBOOKING,
  viewedTabs: new Set([ManagementScheduleTab.AUTO_REBOOKING]),
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
