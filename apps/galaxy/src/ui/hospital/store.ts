import { create } from 'zustand'
import { TabsValue } from './hospital-view'

interface Store {
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: TabsValue.Initial,
  viewedTabs: new Set([TabsValue.Initial]),
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)

    set({
      activeTab,
      viewedTabs,
    })
  },
}))

export { useStore }
