import { createContext } from 'react'
import { createStore as zustandCreateStore } from 'zustand'
import { Experience, ExperienceFilter, Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getExperienceListAction } from '../actions'
import { GetExperiencesResponse } from '../types.ts'

interface StoreState {
  data?: GetExperiencesResponse
  error?: string
  loading?: boolean
  page: number
  formValues?: Partial<ExperienceFilter>
  pageCache: Record<number, GetExperiencesResponse>
  showFilters: boolean
  getExperiences: (
    formValues?: Partial<ExperienceFilter>,
    page?: number,
    reset?: boolean,
  ) => Promise<void>
  sort?: Sort
  setData: (data: Experience[]) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
  refetch: () => void
  jumpToPage: (page: number) => void
  toggleFilters: () => void
}

type Store = ReturnType<typeof createStore>

const createStore = () => {
  return zustandCreateStore<StoreState>()((set, get) => ({
    data: undefined,
    error: undefined,
    loading: undefined,
    formValues: undefined,
    sort: undefined,
    page: 1,
    pageCache: {},
    showFilters: true,
    setData: (experiences) =>
      set({ data: { experiences, total: get().data?.total } }),
    toggleFilters: () => set({ showFilters: !get().showFilters }),
    getExperiences: async (
      formValues: Partial<ExperienceFilter> = {},
      page = 1,
      reset = false,
    ) => {
      set({
        error: undefined,
        loading: true,
        formValues,
      })
      const result = await getExperienceListAction({
        payload: formValues,
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
    },
    prev: () => {
      const page = get().page - 1

      if (get().pageCache[page]) {
        return set({
          data: get().pageCache[page],
          page,
        })
      }
      get().getExperiences(get().formValues, page)
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
      get().getExperiences(get().formValues, page)
    },
    sortData: (column) => {
      set({
        sort: {
          column,
          direction: getNewSortDir(column, get().sort),
        },
      })

      get().getExperiences(get().formValues, get().page, true)
    },
    refetch: () => {
      get().getExperiences(get().formValues, get().page, true)
    },
  }))
}

const StoreContext = createContext<Store | null>(null)

export { createStore, StoreContext, type Store }
