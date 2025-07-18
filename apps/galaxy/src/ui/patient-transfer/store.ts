import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { PatientTransferListResponse, PatientTransferPayload } from './types'
import { getPatientTransferListAction } from './actions'

interface Store {
  data?: PatientTransferListResponse
  loading?: boolean
  error?: string
  payload?: PatientTransferPayload
  page: number
  sort?: Sort
  pageCache: Record<number, PatientTransferListResponse>
  search: (
    payload?: PatientTransferPayload,
    page?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  showFilters: boolean
  toggleFilters: () => void

}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  page: 1,
  pageCache: {},
  showFilters: true,
  sort: undefined,
  toggleFilters: () => set({ showFilters: !get().showFilters }),
  search: async (payload?: PatientTransferPayload, page = 1, reset = false) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })
    const result = await getPatientTransferListAction({
      payload,
      sort: get().sort,
      page,
    })
    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }
    set({
      page,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
      loading: false,
      data: result.data,
    })
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }

    get().search(get().payload, page)
  },
  prev: () => {
    const page = get().page - 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }

    get().search(get().payload, page)
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().search(get().payload, 1, true)
  },
  jumpToPage: (page: number) => {
    if (page < 1) {
      return
    }

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().search(get().payload, page)
  },
}))

export { useStore }
