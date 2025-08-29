import { create } from 'zustand'
import { PayerFilter, PayerListResponse, Sort } from '@/types'
import { getPayersListAction } from '../actions'

interface PayerStore {
  data?: PayerListResponse
  loading: boolean
  error?: string
  sort?: Sort
  payload?: Partial<PayerFilter>
  page: number
  pageCache: Record<number, PayerListResponse>
  search: (
    payload?: Partial<PayerFilter>,
    page?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
  previous: () => void
  jumpToPage: (page: number) => void
}

const useStore = create<PayerStore>((set, get) => ({
  data: undefined,
  loading: false,
  error: undefined,
  sort: undefined,
  payload: undefined,
  page: 1,
  pageCache: {},
  search: async (payload?: Partial<PayerFilter>, page = 1, reset = false) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })
    const result = await getPayersListAction({
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
      page,
      loading: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
    })
  },
  sortData: (column: string) => {
    const { sort } = get()
    const direction: 'asc' | 'desc' =
      sort?.column === column && sort?.direction === 'asc' ? 'desc' : 'asc'
    const newSort = { column, direction }
    set({ sort: newSort, pageCache: {} })
    get().search(get().payload, 1, true)
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
  previous: () => {
    const page = get().page - 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().search(get().payload, page)
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
