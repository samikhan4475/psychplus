import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { TableFilters } from '../../constants'
import { AllVisitsParams, GetAllVisitsListResponse } from '../../types'
import { getDateRangeFromFilter } from '../../utils'
import { getAllVisitsListAction } from '../actions/get-all-visits-list'

interface Store {
  data?: GetAllVisitsListResponse
  loading?: boolean
  error?: string
  activeFilter?: string
  payload?: Partial<AllVisitsParams>
  page: number
  sort?: Sort
  pageCache: Record<number, GetAllVisitsListResponse>
  jumpToPage: (page: number) => void
  setActiveFilter: (activeFilter: string) => void
  search: (
    payload?: Partial<AllVisitsParams>,
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
  activeFilter: TableFilters.Today,
  setActiveFilter: (activeFilter: string) => {
    set({ activeFilter })
  },
  search: async (
    payload?: Partial<AllVisitsParams>,
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })
    const needsDateRange = !payload?.dateFrom || !payload?.dateTo
    const activeFilter = get().activeFilter
    if (needsDateRange) {
      payload = {
        ...payload,
        ...getDateRangeFromFilter(activeFilter),
      }
    }
    const result = await getAllVisitsListAction({
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
      page: page,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
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
    set({
      page,
    })
    get().search(get().payload, page)
  },
  prev: () => {
    const page = get().page - 1

    set({
      data: get().pageCache[page],
      page,
    })
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
