import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getProviderLocationListAction } from './actions'
import { GetStaffLocationListResponse, StaffLocation } from './types'

interface Store {
  data?: GetStaffLocationListResponse
  loading?: boolean
  error?: string
  payload?: Partial<StaffLocation>
  page: number
  sort?: Sort
  pageCache: Record<number, GetStaffLocationListResponse>
  jumpToPage: (page: number) => void
  search: (
    payload?: Partial<StaffLocation>,
    page?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  page: 1,
  pageCache: {},
  sort: undefined,
  search: async (payload, page = 1, reset = false) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })
    const result = await getProviderLocationListAction({
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
      data: result.data,
      loading: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
      page,
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
      set({
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
