import { create } from 'zustand'
import { searchPatientsAction } from './actions'
import { SchemaType } from './patient-lookup-form'
import type { SearchPatientsData } from './types'

interface Store {
  data?: SearchPatientsData
  error?: string
  loading?: boolean
  page: number
  formValues?: Partial<SchemaType>
  pageCache: Record<number, SearchPatientsData>
  search: (
    formValues?: Partial<SchemaType>,
    page?: number,
    reset?: boolean,
  ) => void
  next: () => void
  prev: () => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
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
}))

export { useStore }
