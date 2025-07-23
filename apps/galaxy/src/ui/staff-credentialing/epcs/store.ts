import { SortDirection } from '@tanstack/react-table'
import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getIdProofings } from '../actions'
import {
  GetIdProofingActionPayload,
  GetIdProofingActionResponse,
} from '../types'

interface Store {
  data: GetIdProofingActionResponse
  loading: boolean
  sort?: Sort
  error?: string
  page: number
  pageCache: Record<number, GetIdProofingActionResponse>
  payload?: GetIdProofingActionPayload
  epcsIframeLoaded: boolean
  setEpcsIframeLoaded: (loaded: boolean) => void
  fetch: (
    payload: GetIdProofingActionPayload,
    page?: number,
    reset?: boolean,
  ) => void
  refetch: () => void
  sortData: (column: string, sortDirection?: SortDirection) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  latestProofingIsPending: boolean
}

const useStore = create<Store>((set, get) => ({
  data: {
    userProofings: [],
    total: 0,
  },
  epcsIframeLoaded: false,
  setEpcsIframeLoaded: (loaded: boolean) => {
    set({ epcsIframeLoaded: loaded })
  },
  loading: false,
  error: undefined,
  sort: undefined,
  page: 1,
  pageCache: {},
  payload: undefined,
  latestProofingIsPending: false,

  fetch: async (payload, page = 1, reset = false) => {
    set({ loading: true, error: undefined, payload })
    const result = await getIdProofings({ payload, page, sort: get().sort })
    if (result.state === 'error') {
      set({
        error: result.error,
        loading: false,
        latestProofingIsPending: false,
      })
    } else {
      const userProofings = result.data?.userProofings || [];      
      const latestIsPending = userProofings.length > 0 && userProofings[0].proofingStatus === 'UserPending';
      set({
        data: result.data || [],
        loading: false,
        pageCache: reset
          ? { [page]: result.data }
          : { ...get().pageCache, [page]: result.data },
        latestProofingIsPending: latestIsPending,
      })
    }
  },
  refetch: () => {
    const { payload, page } = get()
    if (!payload) return
    get().fetch(payload, page, true)
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

  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().fetch(get().payload!, 1)
  },
}))

export { useStore }
