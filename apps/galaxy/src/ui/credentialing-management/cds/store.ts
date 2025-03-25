import { SortDirection } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getLicensesAction } from '../actions'
import { transformData } from '../transform'
import { Filters, License, LicenseType } from '../types'

interface Store {
  data: License[]
  loading: boolean
  filters: Partial<Filters>
  total: number
  sort?: Sort
  error?: string
  page: number
  pageCache: Record<number, License[]>
  applySmartFilter: () => void
  search: (filters: Partial<Filters>, page?: number, reset?: boolean) => void
  jumpToPage: (page: number) => void
  prev: () => void
  sortData: (column: string, sortDirection?: SortDirection) => void
  next: () => void
}

const useStore = create<Store>((set, get) => ({
  data: [],
  total: 0,
  filters: {},
  loading: false,
  pageCache: {},
  error: undefined,
  sort: undefined,
  page: 1,
  search: async (filters, page = 1, reset = false) => {
    set({ loading: true, filters })
    const result = await getLicensesAction({
      sort: get().sort,
      payload: { ...filters, licenseTypes: [LicenseType.CDS] },
      page,
    })
    if (result.state === 'error') {
      toast.error(result.error || 'Error while fetching Licenses')
      return set({ loading: false })
    }
    const data = transformData({
      data: result.data.licenses,
    })
    set({
      loading: false,
      total: result.data.total,
      data: data,
      pageCache: reset
        ? { [page]: data }
        : { ...get().pageCache, [page]: data },
      page,
    })
  },
  applySmartFilter: () => {
    set({
      sort: {
        direction: 'asc',
        column: 'endDate',
      },
    })
    const isUseTodayEndDateFilter = get().filters
    get().search(
      {
        ...get().filters,
        isUseTodayEndDateFilter: !isUseTodayEndDateFilter,
      },
      1,
      true,
    )
  },
  jumpToPage: (page: number) => {
    if (page < 1) {
      return
    }
    if (get().pageCache[page]) {
      return set({
        page,
        data: get().pageCache[page],
      })
    }
    get().search(get().filters, page)
  },
  next: () => {
    const page = get().page + 1
    if (get().pageCache[page]) {
      return set({
        page,
        data: get().pageCache[page],
      })
    }
    get().search(get().filters, page)
  },
  prev: () => {
    const page = get().page - 1

    if (get().pageCache[page]) {
      return set({
        page,
        data: get().pageCache[page],
      })
    }
    get().search(get().filters, page)
  },
  sortData: (column, sortDirection?: SortDirection) => {
    set({
      sort: {
        direction: getNewSortDir(
          column,
          sortDirection ? { direction: sortDirection, column } : get().sort,
        ),
        column,
      },
    })
    get().search(get().filters, 1, true)
  },
}))

export { useStore }
