import { create } from 'zustand'
import { Role, Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getAllRolesListAction } from './actions'
import { StaffSearchParams } from './types'

interface Store {
  data?: Role[]
  loading?: boolean
  error?: string
  payload?: Partial<StaffSearchParams>
  sort?: Sort
  showFilters: boolean
  toggleFilters: () => void
  search: (payload?: Partial<StaffSearchParams>) => void
  sortData: (column: string) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  sort: undefined,
  showFilters: true,
  toggleFilters: () => set({ showFilters: !get().showFilters }),
  search: async (payload?: Partial<StaffSearchParams>) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })
    const result = await getAllRolesListAction({
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
