import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getCalendarDate } from '@/utils'
import { getDeaListAction } from './actions'
import { CredentialingTab, DEA } from './types'

type Tab = CredentialingTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  setActiveTab: (tab: Tab) => void
  deaData: DEA[]
  loadingDea: boolean
  fetchDeaList: (staffId: number) => void
  editingRow: number | null
  setEditingRow: (rowIndex: number | null) => void
  historyRow: number | null
  setHistoryRow: (rowIndex: number | null) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: CredentialingTab.DEA,
  viewedTabs: new Set([CredentialingTab.License]),
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)
    set({
      activeTab: activeTab,
      viewedTabs,
    })
  },

  deaData: [],
  loadingDea: false,
  fetchDeaList: async (staffId: number) => {
    set({ loadingDea: true })

    const result = await getDeaListAction({ staffId: staffId, payload: {} })

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching data')
      return set({ loadingDea: false })
    }

    set({
      deaData: result.data.map((dea) => ({
        ...dea,
        startDate: getCalendarDate(dea.startDate),
        endDate: getCalendarDate(dea.endDate),
      })),
      loadingDea: false,
    })
  },
  editingRow: null,
  historyRow: null,
  setEditingRow: (rowIndex) => set({ editingRow: rowIndex }),
  setHistoryRow: (rowIndex) => set({ historyRow: rowIndex }),
}))

export { useStore }
