import { create } from 'zustand'
import { Appointment } from '@/types'
import { getActiveVisitList } from './client-actions'
import { GetActiveVisitFilters } from './types'

interface Store {
  visits?: Appointment[]
  total: number
  loading?: boolean
  error?: string
  page: number
  formValues: Partial<GetActiveVisitFilters>
  pageCache: Record<number, Appointment[]>
  fetchVisits: (
    formValues: Partial<GetActiveVisitFilters>,
    page?: number,
    reset?: boolean,
  ) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  refetch: () => void
}

const useStore = create<Store>((set, get) => ({
  visits: undefined,
  total: 10,
  error: undefined,
  loading: false,
  sort: undefined,
  page: 1,
  showFilters: true,
  formValues: {},
  pageCache: {},
  fetchVisits: async (payload, page = 1, reset = false) => {
    set({
      error: undefined,
      loading: true,
      formValues: payload,
    })
    const result = await getActiveVisitList({ payload, page })
    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }
    set(() => ({
      visits: result?.data,
      total: result?.total,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
      page,
      loading: false,
    }))
  },

  next: () => {
    const nextPage = get().page + 1
    if (get().pageCache[nextPage]) {
      return set({
        visits: get().pageCache[nextPage],
        page: nextPage,
      })
    }
    get().fetchVisits(get().formValues, nextPage)
  },

  prev: () => {
    const prevPage = get().page - 1
    if (prevPage < 1) return
    if (get().pageCache[prevPage]) {
      return set({
        visits: get().pageCache[prevPage],
        page: prevPage,
      })
    }
    get().fetchVisits(get()?.formValues, prevPage)
  },

  jumpToPage: (page: number) => {
    if (page < 1) return
    if (get().pageCache[page]) {
      return set({
        visits: get().pageCache[page],
        page,
      })
    }
    get().fetchVisits(get()?.formValues, page)
  },

  refetch: () => {
    get().fetchVisits(get()?.formValues, 1, true)
  },
}))

export { useStore }
