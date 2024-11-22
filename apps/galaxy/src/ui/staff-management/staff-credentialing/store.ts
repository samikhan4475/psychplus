import { create } from 'zustand'
import { CredentialingTab } from './types'

type Tab = CredentialingTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  setActiveTab: (tab: Tab) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: CredentialingTab.License,
  viewedTabs: new Set([CredentialingTab.License]),
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
