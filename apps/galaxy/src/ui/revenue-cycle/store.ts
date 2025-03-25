import { create } from 'zustand'
import { RevenueCycleTab } from './types'

type Tab = RevenueCycleTab | string
interface ClaimData {
  claimId: string
  claimStatus: string
  claimPrimaryStatus: string
}

interface selectedPdfFileUrl {
  [key: string]: string
}

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  closeableTabs: Set<Tab>
  selectedClaimData: Record<string, ClaimData>
  selectedPayments: Record<string, string>
  selectedPdfFileUrl: selectedPdfFileUrl
  prevTab: Tab
  setSelectedPdfFileUrl: (selectedPdfFileUrl: selectedPdfFileUrl) => void
  setSelectedPayment: (selectedPaymentId: string, checkNumber: string) => void
  setSelectedClaimsData: (claimNumber: string, claimData: ClaimData) => void
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
  selectedPdfFileUrl: {},
  setSelectedPdfFileUrl: (selectedPdfFileUrl: selectedPdfFileUrl) =>
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
      selectedPayments: tab.includes(RevenueCycleTab.CheckDetails)
        ? Object.fromEntries(
            Object.entries(get().selectedPayments).filter(
              ([key]) => tab !== key,
            ),
          )
        : get().selectedPayments,
      selectedClaimData: tab.includes(RevenueCycleTab.ClaimDetails)
        ? Object.fromEntries(
            Object.entries(get().selectedClaimData).filter(
              ([key]) => tab !== key,
            ),
          )
        : get().selectedClaimData,
    })
  },
  selectedPayments: {},
  setSelectedPayment: (selectedPaymentId, checkNumber) =>
    set(() => ({
      selectedPayments: {
        ...get().selectedPayments,
        [checkNumber]: selectedPaymentId,
      },
    })),
  selectedClaimData: {},
  setSelectedClaimsData: (claimNumber, claimData) =>
    set(() => ({
      selectedClaimData: {
        ...get().selectedClaimData,
        [claimNumber]: claimData,
      },
    })),
}))

export { useStore }
