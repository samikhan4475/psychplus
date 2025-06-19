import { create } from 'zustand'
import { getLabOrdersAction } from '../api'
import { LabOrder } from '../types'

interface AfterVisitSummaryStore {
  labOrders: LabOrder[]
  fetchLabOrders: () => void
  loading: boolean
  error?: string
}

const useStore = create<AfterVisitSummaryStore>((set) => ({
  labOrders: [],
  loading: false,
  error: undefined,
  fetchLabOrders: async () => {
    set({ loading: true, labOrders: [], error: undefined })
    const response = await getLabOrdersAction()
    if (response.state === 'error') {
      set({ error: response.error, loading: false })
      return
    }
    set({
      labOrders: response?.data ?? [],
      loading: false,
    })
  },
}))

export { useStore }
