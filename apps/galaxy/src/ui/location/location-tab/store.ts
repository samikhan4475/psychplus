import { create } from 'zustand'
import { Location, Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getLocationListAction } from '../actions'
import { GetLocationListResponse, LocationFilter } from './types'

interface Store {
  data?: GetLocationListResponse
  loading?: boolean
  error?: string
  page: number
  pageCache: Record<number, GetLocationListResponse>
  jumpToPage: (page: number) => void
  formValues?: Partial<LocationFilter>
  setData: (data: Location[]) => void
  fetchLocations: (
    formValues?: Partial<LocationFilter>,
    page?: number,
    reset?: boolean,
  ) => void
  next: () => void
  prev: () => void
  sortData: (column: string) => void
  sort?: Sort
  refetch: () => void
}

const useStore = create<Store>()((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  sort: undefined,
  page: 1,
  formValues: undefined,
  pageCache: {},
  setData: (locations) =>
    set({ data: { locations, total: Number(get().data?.total) } }),
  fetchLocations: async (formValues = {}, page = 1, reset = false) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })
    const result = await getLocationListAction({
      page,
      sort: get().sort,
      formValues,
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

    get().fetchLocations(get().formValues, page)
  },
  prev: () => {
    const page = get().page - 1

    if (page < 1) return

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }

    get().fetchLocations(get().formValues, page)
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
    get().fetchLocations(get().formValues, page)
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().fetchLocations(get().formValues, 1, true)
  },
  refetch: () => {
    get().fetchLocations(get().formValues, get().page, true)
  },
}))

export { useStore }
