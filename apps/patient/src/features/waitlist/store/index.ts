import { create } from 'zustand'
import { Staff } from '@psychplus/user'
import { getWaitlists } from '../api'
import { WAITLISTS_TABLE_PAGE_SIZE } from '../constants'
import { Waitlist } from '../types'

interface WaitlistStore {
  data: Waitlist[]
  loading: boolean
  error?: string
  total: number
  page: number
  pageSize: number
  fetchWaitlists: (page?: number, pageSize?: number) => Promise<void>
  onPageSizeChange: (pageSize: number) => void
  staff: Staff[]
  providers: Staff[]
  setProviders: (providers: Staff[]) => void
  setStaff: (staff: Staff[]) => void
  providerLoading?: boolean
  setProviderLoading: (loading: boolean) => void
}

const useStore = create<WaitlistStore>((set, get) => ({
  data: [],
  loading: false,
  error: undefined,
  total: 0,
  page: 1,
  pageSize: WAITLISTS_TABLE_PAGE_SIZE,
  fetchWaitlists: async (page = 1, pageSize = WAITLISTS_TABLE_PAGE_SIZE) => {
    try {
      set({ loading: true, error: undefined })
      const response = await getWaitlists({
        page,
        pageSize,
      })
      if (response.state === 'error') {
        set({ error: response.error, loading: false })
        return
      }
      set({
        data: response.data,
        total: response.total,
        page,
        loading: false,
      })
    } catch (error) {
      set({
        error:
          (error instanceof Error && error.message) || 'Failed to download.',
        loading: false,
      })
    }
  },
  onPageSizeChange: (page: number) => {
    set({ page })
    get().fetchWaitlists(page, get().pageSize)
  },
  providers: [],
  staff: [],
  setProviders: (providers) => set({ providers }),
  setStaff: (staff) => set({ staff }),
  providerLoading: false,
  setProviderLoading: (loading) => set({ providerLoading: loading }),
}))

export { useStore }
