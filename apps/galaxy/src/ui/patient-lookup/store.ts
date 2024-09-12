import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { searchPatientsAction } from './actions'
import { SchemaType } from './patient-lookup-form'
import type { SearchPatientsData } from './types'

interface Store {
  data?: SearchPatientsData
  error?: string
  sort?: Sort
  loading?: boolean
  page: number
  formValues?: Partial<SchemaType>
  pageCache: Record<number, SearchPatientsData>
  search: (
    formValues?: Partial<SchemaType>,
    page?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  sort: undefined,
  page: 1,
  formValues: undefined,
  pageCache: {},
  search: async (
    formValues: Partial<SchemaType> = {},
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await searchPatientsAction({
      ...formValues,
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

    get().search(get().formValues, page)
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

    get().search(get().formValues, 1, true)
  },
}))

export { useStore }
