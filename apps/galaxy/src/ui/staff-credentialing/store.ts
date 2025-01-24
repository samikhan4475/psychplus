import { create } from 'zustand'
import { CredentialingTab, License } from './types'

type Tab = CredentialingTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  setActiveTab: (tab: Tab) => void
  editingRow: License | null
  setEditingRow: (row: License | null) => void
  historyRow: License | null
  setHistoryRow: (row: License | null) => void
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
  editingRow: null,
  historyRow: null,
  setEditingRow: (rowIndex) => set({ editingRow: rowIndex }),
  setHistoryRow: (rowIndex) => set({ historyRow: rowIndex }),
}))

export { useStore }
