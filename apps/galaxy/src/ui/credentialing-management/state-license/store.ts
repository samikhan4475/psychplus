import { SortDirection } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getLicensesAction } from '../actions'
import { transformData } from '../transform'
import { Filters, License, LicenseType } from '../types'

interface Store {
  loading: boolean
  filters: Partial<Filters>
  data: License[]
  total: number
  error?: string
  sort?: Sort
  page: number
  pageCache: Record<number, License[]>
  search: (filters: Partial<Filters>, page?: number, reset?: boolean) => void
  applySmartFilter: () => void
  sortData: (column: string, sortDirection?: SortDirection) => void
  jumpToPage: (page: number) => void
  next: () => void
  prev: () => void
}

const useStore = create<Store>((set, get) => ({
  filters: {},
  data: [],
  total: 0,
  error: undefined,
  loading: false,
  sort: undefined,
  page: 1,
  pageCache: {},
  search: async (filters, page = 1, reset = false) => {
    set({ loading: true, filters })
    const result = await getLicensesAction({
      payload: { ...filters, licenseTypes: [LicenseType.License] },
      page,
      sort: get().sort,
    })
    if (result.state === 'error') {
      toast.error(result.error || 'Error while fetching Licenses')
      return set({ loading: false })
    }
    const data = transformData({
      data: result.data.licenses,
    })
    set({
      data: data,
      total: result.data.total,
      loading: false,
      pageCache: reset
        ? { [page]: data }
        : { ...get().pageCache, [page]: data },
      page,
    })
  },
  applySmartFilter: () => {
    set({
      sort: {
        column: 'endDate',
        direction: 'asc',
      },
    })
    get().search(
      {
        ...get().filters,
        isUseTodayEndDateFilter: !get().filters?.isUseTodayEndDateFilter,
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
        data: get().pageCache[page],
        page,
      })
    }
    get().search(get().filters, page)
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }

    get().search(get().filters, page)
  },
  prev: () => {
    const page = get().page - 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().search(get().filters, page)
  },
  sortData: (column, sortDirection?: SortDirection) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(
          column,
          sortDirection ? { column, direction: sortDirection } : get().sort,
        ),
      },
    })
    get().search(get().filters, 1, true)
  },
}))

export { useStore }
