import { create } from 'zustand'

interface Store {
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: 'ListView',
  viewedTabs: new Set('ListView'),
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
