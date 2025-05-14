import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { searchExternalReferralsAction } from './actions'
import { ExternalReferralSchemaType } from './external-referral-filter-form'
import { transformOut } from './transform'
import type { SearchPatientsData } from './types'
import { getInitialValues } from './utils'

interface Store {
  data?: SearchPatientsData
  error?: string
  sort?: Sort
  loading?: boolean
  page: number
  showFilters: boolean
  formValues?: Partial<ExternalReferralSchemaType>
  pageCache: Record<number, SearchPatientsData>
  search: (
    formValues?: Partial<ExternalReferralSchemaType>,
    page?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  toggleFilters: () => void
  refetch: () => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  sort: undefined,
  page: 1,
  showFilters: true,
  formValues: getInitialValues(),
  pageCache: {},
  toggleFilters: () => set({ showFilters: !get().showFilters }),

  search: async (
    formValues: Partial<ExternalReferralSchemaType> = {},
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await searchExternalReferralsAction({
      ...transformOut(formValues),
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

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().search(get().formValues, page)
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
    get().search(get().formValues, page)
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
  refetch: () => {
    get().search(get().formValues, get().page, true)
  },
}))

export { useStore }
