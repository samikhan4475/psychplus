import { create } from 'zustand'
import { MedicationOrdersTabs } from '../constant'
import { MedicationRefill, MedicationRefillResponseList } from '../types'

interface StoreState {
  data: MedicationRefillResponseList
  loading: boolean
  error?: string
  payload?: MedicationRefill
  activeTab: string
  viewedTabs: Set<string>
  fetch: (
  ) => Promise<void>
  setActiveTab: (tab: string) => void
  pageCache: Record<number, MedicationRefillResponseList>
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  page: number
}

const useStore = create<StoreState>((set, get) => ({
  appointmentId: '',
  page: 1,
  pageCache: {},
  data: {
    refillRequests: [],
    total: 0,
  },
  selectedTestId: undefined,
  error: undefined,
  payload: undefined,
  loading: false,
  activeTab: MedicationOrdersTabs.REFILL_REQUESTS,
  viewedTabs: new Set([MedicationOrdersTabs.REFILL_REQUESTS]),

  fetch: async () => {

  },

  setActiveTab: (activeTab) => {
    const { viewedTabs } = get()
    viewedTabs.add(activeTab)

    set({
      activeTab,
      viewedTabs,
    })
  },

  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      set({
        data: get().pageCache[page],
        page,
      })
    } else {
      const { payload } = get()
      if (payload) {
        get().fetch()
      }
    }
  },

  prev: () => {
    const page = get().page - 1

    if (page >= 1 && get().pageCache[page]) {
      set({
        data: get().pageCache[page],
        page,
      })
    }
  },

  jumpToPage: (page: number) => {
    if (page < 1) return

    if (get().pageCache[page]) {
      set({
        data: get().pageCache[page],
        page,
      })
    } else {
      const { payload } = get()
      if (payload) {
        get().fetch()
      }
    }
  },
}))

export { useStore }
