import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { PayerPlan } from '@/types/payer'

interface Store {
  data: PayerPlan[]
  loading?: boolean
  error?: string
  payload?: Partial<PayerPlan>
  sort?: Sort
  sortData: (column: string) => void
}

const useStore = create<Store>((set, get) => ({
  data: [],
  sort: undefined,
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
  },
}))

export { useStore }
