import { create } from 'zustand'
import { Sort } from '@/types'
import { getPayerAuditHistoryListAction } from '@/ui/payer/actions'
import { PayerAuditHistory, PayerAuditHistoryPayload } from '@/ui/payer/types'
import { getNewSortDir } from '@/utils'

interface Store {
  data: PayerAuditHistory[]
  loading?: boolean
  error?: string
  payload?: PayerAuditHistoryPayload
  sort?: Sort
  sortData: (column: string) => void
  search: (payload?: PayerAuditHistoryPayload) => void
}

const useStore = create<Store>((set, get) => ({
  data: [],
  sort: undefined,
  search: async (payload?: PayerAuditHistoryPayload) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })
    const result = await getPayerAuditHistoryListAction({
      payload,
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
    })
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().search(get().payload)
  },
}))

export { useStore }
