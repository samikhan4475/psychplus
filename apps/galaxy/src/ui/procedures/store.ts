import { create } from 'zustand'
import { ProcedureTabs } from './constants'

interface Store {
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
  phq9Score: string
  setPhq9Score: (phq9Score: string) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: ProcedureTabs.ECT,
  viewedTabs: new Set([ProcedureTabs.ECT]),
  phq9Score: '',
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)

    set({
      activeTab,
      viewedTabs,
    })
  },

  setPhq9Score: (phq9Score) => {
    set({
      phq9Score,
    })
  }
}))

export { useStore }
