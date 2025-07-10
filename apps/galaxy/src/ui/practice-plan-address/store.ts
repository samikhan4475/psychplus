import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getPracticePlanAddressAction } from './actions'
import { PRACTICE_PLAN_ADDRESS_TABLE_PAGE_SIZE } from './constants'
import { PracticePlanAddress, PracticePlanAddressParams } from './types'

interface Store {
  data?: PracticePlanAddress[]
  loading?: boolean
  error?: string
  payload?: Partial<PracticePlanAddressParams>
  page: number
  sort?: Sort
  pageSize: number
  total?: number
  pageCache: Record<number, PracticePlanAddress[] | undefined>
  onPageSizeChange: (pageSize: number) => void
  jumpToPage: (page: number) => void
  search: (
    payload?: Partial<PracticePlanAddressParams>,
    page?: number,
    pageSize?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
}

const useStore = create<Store>((set, get) => ({
  data: [],
  page: 1,
  pageCache: {},
  total: undefined,
  pageSize: PRACTICE_PLAN_ADDRESS_TABLE_PAGE_SIZE,
  sort: undefined,
  showFilters: true,
  dropDownOptions: {
    organizations: [],
    staffs: [],
    practices: [],
    roles: [],
  },
  search: async (
    payload,
    page = 1,
    pageSize = PRACTICE_PLAN_ADDRESS_TABLE_PAGE_SIZE,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
      page: 1,
      pageSize: PRACTICE_PLAN_ADDRESS_TABLE_PAGE_SIZE,
    })
    const result = await getPracticePlanAddressAction({
      payload,
      sort: get().sort,
      page,
      pageSize,
    })
    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }
    set({
      data: result.data,
      total: result.total,
      loading: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
      page,
      pageSize,
    })
  },
  onPageSizeChange: (pageSize: number) => {
    set({ pageSize, page: 1, pageCache: {} })
    get().search(get().payload, 1, get().pageSize)
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }

    get().search(get().payload, page, get().pageSize)
  },
  prev: () => {
    const page = get().page - 1
    if (page < 1) return
    if (get().pageCache[page]) {
      set({
        data: get().pageCache[page],
        page,
      })
    }
    get().search(get().payload, page, get().pageSize)
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().search(get().payload, 1, get().pageSize, true)
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
    get().search(get().payload, page, get().pageSize)
  },
}))

export { useStore }
