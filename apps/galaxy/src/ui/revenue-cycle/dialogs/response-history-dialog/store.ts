import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getResponseHistoryDetailListAction } from '../../actions'
import { ResponseHistoryDetailListResponse } from '../../types'

interface Store {
  data?: ResponseHistoryDetailListResponse
  loading?: boolean
  error?: string
  batchId: string
  sort?: Sort
  pageCache: Record<number, ResponseHistoryDetailListResponse>
  search: (batchId: string, page?: number, reset?: boolean) => void
  sortData: (column: string) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  page: 1,
  pageCache: {},
  sort: undefined,
  batchId: '',
  search: async (batchId: string, page = 1, reset = false) => {
    set({
      error: undefined,
      loading: true,
      batchId,
    })
    const result = await getResponseHistoryDetailListAction({
      batchId,
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
    })
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().search(get().batchId, 1, true)
  },
}))

export { useStore }
