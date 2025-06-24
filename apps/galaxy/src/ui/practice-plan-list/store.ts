import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getPlanListAction } from './actions/get-plan-list'
import { GetPlanListResponse, InsurancePlanListSearchParams } from './types'

interface Store {
  data?: GetPlanListResponse
  loading?: boolean
  error?: string
  payload?: Partial<InsurancePlanListSearchParams>
  page: number
  sort?: Sort
  pageCache: Record<number, GetPlanListResponse>
  search: (
    payload?: Partial<InsurancePlanListSearchParams>,
    page?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  page: 1,
  pageCache: {},
  sort: undefined,
  search: async (
    payload?: Partial<InsurancePlanListSearchParams>,
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })
    const result = await getPlanListAction({
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
      loading: false,
      page,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
      data: result.data,
    })
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        page,
        data: get().pageCache[page],
      })
    }

    get().search(get().payload, page)
  },
  prev: () => {
    const page = get().page - 1

    if (get().pageCache[page]) {
      return set({
        page,
        data: get().pageCache[page],
      })
    }

    get().search(get().payload, page)
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().search(get().payload, 1, true)
  },
  jumpToPage: (page: number) => {
    if (page < 1) {
      return
    }

    if (get().pageCache[page]) {
      return set({
        page,
        data: get().pageCache[page],
      })
    }
    get().search(get().payload, page)
  },
}))

export { useStore }
