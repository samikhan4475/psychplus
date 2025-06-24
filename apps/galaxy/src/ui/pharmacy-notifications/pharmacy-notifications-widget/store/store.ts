import { create } from 'zustand'
import { getPharmacyNotifications } from '../actions/get-pharmacy-notifcations'
import {
  PharmacyNotificationsPayload,
  PharmacyNotificationsResponseList,
} from '../types'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'

interface StoreState {
  data: PharmacyNotificationsResponseList
  loading: boolean
  error?: string
  appointmentId?: string
  payload?: PharmacyNotificationsPayload
  pageCache: Record<number, PharmacyNotificationsResponseList>
  page: number
  sort?: Sort

  fetch: (
    payload?: PharmacyNotificationsPayload,
    page?: number,
    reset?: boolean,
  ) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  sortData: (column: string) => void
}

const useStore = create<StoreState>((set, get) => ({
  appointmentId: '',
  page: 1,
  pageCache: {},
  data: {
    pharmacyNotifications: [],
    total: 0,
  },
  selectedRow: undefined,
  selectedRows: [],
  isReviewDialogOpen: false,
  loading: true,
  error: undefined,
  payload: undefined,

  fetch: async (payload, page = 1, reset = false) => {
    if (reset) {
      set({ page: 1, pageCache: {} })
    }

    set({ error: undefined, loading: true, payload })

    const result = await getPharmacyNotifications({ payload, page,sort: get().sort, })
    if (result.state === 'error') {
      set({
        error: result.error,
        loading: false,
      })
    } else {
      set({
        data: result.data || [],
        loading: false,
        pageCache: reset ? {} : { ...get().pageCache, [page]: result.data },
      })
    }
  },
  next: () => {
    const nextPage = get().page + 1

    set({ page: nextPage })

    if (get().pageCache[nextPage]) {
      set({
        data: get().pageCache[nextPage],
      })
    } else {
      get().fetch(get().payload!, nextPage)
    }
  },

  prev: () => {
    const prevPage = get().page - 1
    if (prevPage >= 1) {
      set({ page: prevPage })
      if (get().pageCache[prevPage]) {
        set({
          data: get().pageCache[prevPage],
        })
      }
    }
  },
   sortData: (column) => {
      set({
        sort: {
          column,
          direction: getNewSortDir(column, get().sort),
        },
      })
      get().fetch(get().payload!, 1)
    },
  jumpToPage: (page: number) => {
    if (page < 1) return
    set({ page })
    if (get().pageCache[page]) {
      set({
        data: get().pageCache[page],
      })
    } else {
      get().fetch(get().payload!, page)
    }
  },
}))

export { useStore }
