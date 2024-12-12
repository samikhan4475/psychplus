import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getAllOrganizationsListAction } from '../actions'
import {
  GetOrganizationsListResponse,
  OrganizationsSearchParams,
} from '../types'

interface Store {
  data?: GetOrganizationsListResponse
  loading?: boolean
  error?: string
  payload?: OrganizationsSearchParams
  page: number
  sort?: Sort
  pageCache: Record<number, GetOrganizationsListResponse>
  search: (
    payload?: OrganizationsSearchParams,
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
    payload?: OrganizationsSearchParams,
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })
    const result = await getAllOrganizationsListAction({
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
      loading: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
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

    get().search(get().payload, page)
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
    get().search(get().payload, 1, true)
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
