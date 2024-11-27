import { create } from 'zustand'
import { ClinicScheduleTabs } from './constants'

interface Store {
  activeTab: string
  visitedTabs: Set<string>
  setActiveTab: (val: string) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: ClinicScheduleTabs.ClinicTime,
  visitedTabs: new Set([ClinicScheduleTabs.ClinicTime]),
  setActiveTab: (activeTab: string) => {
    const visitedTabs = get().visitedTabs
    visitedTabs.add(activeTab)
    set({
      activeTab,
      visitedTabs,
    })
  },
}))

export { useStore }
