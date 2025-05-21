import { create } from 'zustand'
import { getStaffHistoryListAction } from '../../actions'
import { Staff, StaffHistoryPayload } from '../../types'

interface Store {
  data?: Staff[]
  loading?: boolean
  error?: string
  selectedRecord?: Staff
  staffId?: string
  setSelectedRecord: (record: Staff) => void
  search: (staffId: string, payload?: Partial<StaffHistoryPayload>) => void
}

const useStore = create<Store>((set) => ({
  data: undefined,
  selectedRecord: undefined,
  loading: false,
  setSelectedRecord: (record: Staff) => set({ selectedRecord: record }),
  search: async (staffId: string, payload?: Partial<StaffHistoryPayload>) => {
    set({
      error: undefined,
      loading: true,
      staffId,
    })
    const result = await getStaffHistoryListAction(staffId, { payload })
    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }
    set({
      data: result.data,
      loading: false,
    })
  },
}))

export { useStore }
