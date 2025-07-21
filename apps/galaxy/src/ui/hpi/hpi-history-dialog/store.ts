import { getQuickNoteHistoryAction } from '@/actions'
import { QuickNoteHistory } from '@/types'
import { HospitalInitialHistoryParams } from '@/ui/hospital/hospital-initial-widget/history/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { create } from 'zustand'

interface HpiHistoryStore {
  filters: HospitalInitialHistoryParams
  history: QuickNoteHistory[]
  loading: boolean
  selectedHistory?: QuickNoteHistory | object
  setFilters: (filters: HospitalInitialHistoryParams) => void
  fetchHistory: ({
    patientId,
    filters,
  }: {
    patientId: string
    filters?: HospitalInitialHistoryParams
  }) => Promise<void>
  setSelectedHistory: (history: QuickNoteHistory) => void
}

export const useHpiHistoryStore = create<HpiHistoryStore>((set) => ({
  filters: {},
  history: [],
  loading: false,
  selectedHistory: {},
  setFilters: (filters) => set({ filters }),
  fetchHistory: async ({ patientId, filters }) => {
    set({ loading: true })
    const response = await getQuickNoteHistoryAction(
      patientId,
      QuickNoteSectionName.QuicknoteSectionHPI,
      filters as HospitalInitialHistoryParams,
    )
    const hasData = response.state === "success"
    const dataToSend = () => {
      if (!hasData) return []

      const data = response?.data ?? []

      if (filters?.username) {
        const usernameFilter = filters.username.toLowerCase()
        return data.filter(item =>
          item.createdByFullName.toLowerCase().includes(usernameFilter)
        )
      }

      return data
    }

    set({
      history: dataToSend(),
      loading: false,
      selectedHistory: hasData ? response.data[0] : {}
    })
  },
  setSelectedHistory: (history: QuickNoteHistory) =>
    set({ selectedHistory: history }),
}))
