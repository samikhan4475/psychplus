import { create } from 'zustand'
import { RevenueCycleTab } from './types'

type Tab = RevenueCycleTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  closeableTabs: Set<Tab>
  setActiveTab: (tab: Tab) => void
  closeTab: (tab: Tab) => void
}

function isActiveTabCloseable<T extends Record<string, string | number>>(
  value: string,
  enumObject: T,
): boolean {
  return Object.values(enumObject).includes(value)
}

const useStore = create<Store>((set, get) => ({
  activeTab: RevenueCycleTab.Claim,
  viewedTabs: new Set([RevenueCycleTab.Claim]),
  closeableTabs: new Set(),
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)
    if (isActiveTabCloseable(activeTab, RevenueCycleTab)) {
      set({ activeTab, viewedTabs })
    } else {
      set({
        activeTab: activeTab,
        closeableTabs: get().closeableTabs.add(activeTab),
        viewedTabs,
      })
    }
  },
  closeTab: (tab) => {
    const updatedCloseableTabs = get().closeableTabs
    updatedCloseableTabs.delete(tab)
    const updatedViewedTabs = get().viewedTabs
    updatedViewedTabs.delete(tab)
    set({
      activeTab: RevenueCycleTab.Claim,
      closeableTabs: updatedCloseableTabs,
      viewedTabs: updatedViewedTabs,
    })
  },
}))

export { useStore }
