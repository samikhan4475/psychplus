import { create } from 'zustand'
import { Sort } from '@/types'
import { getVacationTimeList } from './actions'
import { GetVacationFilters, VacationTime } from './types'

interface Store {
  data?: VacationTime[]
  total: number
  error?: string
  sort?: Sort
  loading?: boolean
  page: number
  showFilters: boolean
  formValues?: Partial<GetVacationFilters>
  pageCache: Record<number, VacationTime[]>
  fetchLocationTimeList: (
    formValues?: Partial<GetVacationFilters>,
    page?: number,
    reset?: boolean,
  ) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  toggleFilters: () => void
  refetch: () => void
}

const useStore = create<Store>()((set, get) => ({
  data: undefined,
  total: 10,
  error: undefined,
  loading: undefined,
  sort: undefined,
  page: 1,
  showFilters: true,
  formValues: undefined,
  pageCache: {},
  toggleFilters: () => set({ showFilters: !get().showFilters }),
  fetchLocationTimeList: async (
    formValues: Partial<GetVacationFilters> = {},
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await getVacationTimeList({
      formValues,
      page,
      sort: get().sort,
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

    get().fetchLocationTimeList(get().formValues, page)
  },
  prev: () => {
    const page = get().page - 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().fetchLocationTimeList(get().formValues, page)
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
    get().fetchLocationTimeList(get().formValues, page)
  },
  refetch: () => {
    get().fetchLocationTimeList(get().formValues, 1, true)
  },
}))

export { useStore }
