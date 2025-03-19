import { create } from 'zustand'
import { CredentialingTab } from './types'

type Tab = CredentialingTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  setActiveTab: (tab: Tab) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: CredentialingTab.StateLicense,
  viewedTabs: new Set([CredentialingTab.StateLicense]),
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
