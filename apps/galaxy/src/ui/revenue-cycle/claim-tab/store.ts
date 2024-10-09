import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getClaimsListAction } from '../actions'
import { ClaimListSearchParams, GetClaimsListResponse } from '../types'

interface Store {
  claimsListData?: GetClaimsListResponse
  claimsListLoading?: boolean
  claimsListError?: string
  claimsListPayload?: ClaimListSearchParams
  page: number
  sort?: Sort
  pageCache: Record<number, GetClaimsListResponse>
  claimsListSearch: (
    payload?: ClaimListSearchParams,
    page?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
}

const useStore = create<Store>((set, get) => ({
  claimsListData: undefined,
  page: 1,
  pageCache: {},
  sort: undefined,
  claimsListSearch: async (
    payload?: ClaimListSearchParams,
    page = 1,
    reset = false,
  ) => {
    set({
      claimsListError: undefined,
      claimsListLoading: true,
      claimsListPayload: payload,
    })
    const result = await getClaimsListAction({
      payload,
      sort: get().sort,
      page,
    })
    if (result.state === 'error') {
      return set({
        claimsListError: result.error,
        claimsListLoading: false,
      })
    }
    set({
      claimsListData: result.data,
      claimsListLoading: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
    })
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        claimsListData: get().pageCache[page],
        page,
      })
    }

    get().claimsListSearch(get().claimsListPayload, page)
  },
  prev: () => {
    const page = get().page - 1

    set({
      claimsListData: get().pageCache[page],
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
    get().claimsListSearch(get().claimsListPayload, 1, true)
  },
}))

export { useStore }
