import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { create } from 'zustand'
import {
  Practice,
  PracticeSearchParams
} from '../organization-practice/types'
import { getAllOrganizationPracticesListAction } from './actions'

interface Store {
  data?: Practice[]
  loading?: boolean
  error?: string
  payload?: PracticeSearchParams
  sort?: Sort
  search: (
    payload?: PracticeSearchParams,
  ) => void
  sortData: (column: string) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  sort: undefined,
  search: async (
    payload?: PracticeSearchParams,
  ) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })
    const result = await getAllOrganizationPracticesListAction({
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
