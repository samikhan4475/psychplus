import { create } from 'zustand'
import { HistoryTabs } from './constant'

interface Store {
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: HistoryTabs.PPH,
  viewedTabs: new Set([HistoryTabs.PPH]),
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
