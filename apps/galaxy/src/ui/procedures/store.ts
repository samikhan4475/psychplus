import { create } from 'zustand'
import { ProcedureTabs } from './constants'

interface Store {
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
  patientId: string
  setPatientId: (patientId: string) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: ProcedureTabs.ECT,
  viewedTabs: new Set([ProcedureTabs.ECT]),
  patientId: '',
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)

    set({
      activeTab,
      viewedTabs,
    })
  },
  setPatientId: (patientId) => {
    set({
      patientId,
    })
  }
}))

export { useStore }
