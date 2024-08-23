import { create } from 'zustand'
import { PATIENT_INFO_HISTORY_TAB, PATIENT_INFO_TAB } from './constants'

interface Store {
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
  showPatientHistory: boolean
  openPatientHistory: () => void
  closePatientHistory: () => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: PATIENT_INFO_TAB,
  viewedTabs: new Set([PATIENT_INFO_TAB]),
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)

    set({
      activeTab,
      viewedTabs,
    })
  },
  showPatientHistory: false,
  openPatientHistory: () => {
    set({
      activeTab: PATIENT_INFO_HISTORY_TAB,
      showPatientHistory: true,
    })
  },
  closePatientHistory: () => {
    set({
      activeTab:
        get().activeTab === PATIENT_INFO_HISTORY_TAB
          ? PATIENT_INFO_TAB
          : get().activeTab,
      showPatientHistory: false,
    })
  },
}))

export { useStore }
