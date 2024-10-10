import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getPatientPaymentHistoryAction } from './actions'
import { SchemaType } from './filter-form'
import { transformOut } from './transform'
import type { GetPaymentHistorysData } from './types'

interface Store {
  data?: GetPaymentHistorysData
  error?: string
  loading?: boolean
  page: number
  formValues?: Partial<SchemaType>
  pageCache: Record<number, GetPaymentHistorysData>
  fetchPatientPaymentHistory: (
    formValues?: Partial<SchemaType>,
    page?: number,
    reset?: boolean,
  ) => void
  sort?: Sort
  sortData: (column: string) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  setData: (data: GetPaymentHistorysData) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  formValues: undefined,
  sort: undefined,
  page: 1,
  pageCache: {},

  setData: (data) => set({ data }),

  fetchPatientPaymentHistory: async (
    formValues: Partial<SchemaType> = {},
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const payload = transformOut(formValues)

    const result = await getPatientPaymentHistoryAction({
      ...payload,
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

    get().fetchPatientPaymentHistory(get().formValues, page)
  },
  prev: () => {
    const page = get().page - 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().fetchPatientPaymentHistory(get().formValues, page)
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
    get().fetchPatientPaymentHistory(get().formValues, page)
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })

    get().fetchPatientPaymentHistory(get().formValues, 1, true)
  },
}))

export { useStore }
