import { create } from 'zustand'
import { QuestionnaireTabs } from './constants'

interface Store {
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: QuestionnaireTabs.DASHBOARD_TAB,
  viewedTabs: new Set([QuestionnaireTabs.DASHBOARD_TAB]),
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
