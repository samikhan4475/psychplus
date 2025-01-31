import { create } from 'zustand'
import { RevenueCycleTab } from './types'

type Tab = RevenueCycleTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  closeableTabs: Set<Tab>
  selectedClaimId: string
  selectedPayments: Record<string, string>
  selectedPdfFileUrl: string
  prevTab: Tab
  setSelectedPdfFileUrl: (selectedPdfFileUrl: string) => void
  selectedClaimStatus: string
  setSelectedClaimStatus: (selectedClaimStatus: string) => void
  selectedClaimPrimaryStatus: string
  setSelectedClaimPrimaryStatus: (selectedClaimStatus: string) => void
  setSelectedClaim: (selectedClaimId: string) => void
  setSelectedPayment: (selectedPaymentId: string, checkNumber: string) => void
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
  activeTab: RevenueCycleTab.Claim,
  viewedTabs: new Set([RevenueCycleTab.Claim]),
  closeableTabs: new Set(),
  prevTab: RevenueCycleTab.Claim,
  insurancePayers: [],
  clinics: [],
  claimsListData: undefined,
  selectedPdfFileUrl: '',
  setSelectedPdfFileUrl: (selectedPdfFileUrl: string) =>
    set(() => ({ selectedPdfFileUrl: selectedPdfFileUrl })),
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)
    if (isActiveTabCloseable(activeTab, RevenueCycleTab)) {
      set({ activeTab, viewedTabs, prevTab: activeTab })
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
      activeTab: get().prevTab ?? RevenueCycleTab.Claim,
      closeableTabs: updatedCloseableTabs,
      viewedTabs: updatedViewedTabs,
      selectedClaimId: '',
      selectedPayments: tab.includes(RevenueCycleTab.CheckDetails)
        ? Object.fromEntries(
            Object.entries(get().selectedPayments).filter(
              ([key]) => tab !== key,
            ),
          )
        : get().selectedPayments,
    })
  },
  selectedClaimId: '',
  setSelectedClaim: (selectedClaimId: string) =>
    set(() => ({ selectedClaimId: selectedClaimId })),
  selectedPayments: {},
  setSelectedPayment: (selectedPaymentId, checkNumber) =>
    set(() => ({
      selectedPayments: {
        ...get().selectedPayments,
        [checkNumber]: selectedPaymentId,
      },
    })),
  selectedClaimStatus: '',
  setSelectedClaimStatus: (selectedClaimStatus: string) =>
    set(() => ({ selectedClaimStatus: selectedClaimStatus })),
  selectedClaimPrimaryStatus: '',
  setSelectedClaimPrimaryStatus: (selectedClaimPrimaryStatus: string) =>
    set({ selectedClaimPrimaryStatus }),
}))

export { useStore }
