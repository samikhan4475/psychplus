// claim-tab-store
import { type StateCreator } from 'zustand'
import { ClaimServiceLine } from '../components/claim-form/types'
import { initialTabs, Tab, TabsStore } from './types'

const useTabsStore: StateCreator<TabsStore> = (set) => ({
  tabs: [],
  activeTabId: initialTabs[0].id, // Default active tab
  addTab: (tab: Tab) =>
    set((state) => {
      // add as many as user can
      if (!state.tabs.find((t) => t.id === tab.id)) {
        return {
          tabs: [...state.tabs, tab],
          activeTabId: tab.id,
          selectedClaimId: tab.claimId,
        }
      }
      return { activeTabId: tab.id, selectedClaimId: tab.claimId } // Set active tab even if it exists
    }),
  setActiveTab: (tabId: string) =>
    set((state) => {
      const tab = state.tabs.find((t) => t.id === tabId)
      return {
        activeTabId: tabId,
        selectedClaimId: tab
          ? tab.claimId ?? state.selectedClaimId
          : state.selectedClaimId,
      }
    }),
  selectedClaimId: '',
  setSelectedClaim: (selectedClaimId: string) =>
    set(() => ({ selectedClaimId: selectedClaimId })),

  removeTab: (tabId: string) =>
    set((state) => {
      // Find index of the tab to remove
      const tabIndex = state.tabs.findIndex((t) => t.id === tabId)
      const newTabs = [...state.tabs]
      newTabs.splice(tabIndex, 1) // Remove the tab
      if (newTabs.length === 0) {
        // No tabs left, set to initial tab or handle as needed
        return {
          tabs: newTabs,
          activeTabId: initialTabs[0].id, // Ensure initial tab is available or handle empty state
          selectedClaimId: '',
          selectedClaimBilledAmt: 0,
          deletedClaimServiceLines: [],
        }
      }

      // Set new active tab and selectedClaimId
      const newActiveTabId =
        newTabs.length > 0
          ? newTabs[Math.max(tabIndex - 1, 0)].id
          : initialTabs[0].id
      const newSelectedClaimId =
        newTabs.find((t) => t.id === newActiveTabId)?.claimId ?? ''

      return {
        tabs: newTabs,
        activeTabId: newActiveTabId,
        selectedClaimId: newSelectedClaimId,
        selectedClaimBilledAmt: 0,
        deletedClaimServiceLines: [],
      }
    }),
  selectedClaimBilledAmt: 0,
  setSelectedClaimBilledAmt: (selectedClaimBilledAmt: number) =>
    set(() => ({ selectedClaimBilledAmt: selectedClaimBilledAmt })),
  deletedClaimServiceLines: [],
  setDeletedClaimServiceLines: (newLine: ClaimServiceLine) =>
    set((state) => {
      const existingLines = state.deletedClaimServiceLines
      const index = existingLines.findIndex((line) => line.id === newLine.id)

      if (index > -1) {
        const updatedLines = [...existingLines]
        updatedLines[index] = newLine
        return { deletedClaimServiceLines: updatedLines }
      } else {
        return { deletedClaimServiceLines: [...existingLines, newLine] }
      }
    }),
})
export { useTabsStore }
