import { create } from 'zustand'
import { PayerTabs } from './types'

type Tab = PayerTabs | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  closeableTabs: Set<Tab>
  selectPayerPlanId: string
  setSelectedPayerPlan: (selectPayerPlanId: string) => void
  setActiveTab: (tab: Tab) => void
  closeTab: (tab: Tab) => void
}

function isActiveTabCloseable<T extends Record<string, string | number>>(
  value: string,
  enumObject: T,
): boolean {
  return Object.values(enumObject).includes(value)
}

const useStore = create<Store>((set, get) => ({
  activeTab: PayerTabs.Plan,
  viewedTabs: new Set([PayerTabs.Plan]),
  closeableTabs: new Set(),
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)
    if (isActiveTabCloseable(activeTab, PayerTabs)) {
      set({ activeTab, viewedTabs })
    } else {
      set({
        activeTab: activeTab,
        closeableTabs: get().closeableTabs.add(activeTab),
        viewedTabs,
      })
    }
  },
  closeTab: (tab) => {
    const updatedCloseableTabs = get().closeableTabs
    updatedCloseableTabs.delete(tab)
    const updatedViewedTabs = get().viewedTabs
    updatedViewedTabs.delete(tab)
    set({
      activeTab: PayerTabs.Plan,
      closeableTabs: updatedCloseableTabs,
      viewedTabs: updatedViewedTabs,
      selectPayerPlanId: '',
    })
  },
  selectPayerPlanId: '',
  setSelectedPayerPlan: (selectPayerPlanId: string) =>
    set(() => ({ selectPayerPlanId: selectPayerPlanId })),
}))

export { useStore }
