import { create } from 'zustand'
import { LinkAccountType, Sort } from '@/types'
import { searchPatientsAction } from '@/ui/patient-lookup/actions'
import { SearchPatientsData } from '@/ui/patient-lookup/types'
import { getNewSortDir } from '@/utils'

interface Store {
  data?: SearchPatientsData
  error?: string
  sort?: Sort
  loading?: boolean
  page: number
  payload?: Partial<LinkAccountType>
  search: (payload?: Partial<LinkAccountType>, page?: number) => void
  sortData: (column: string) => void
}
const defaultParams = { IsIncludePatientLastLogin: true }

const useLinkAccountStore = create<Store>()((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  sort: undefined,
  page: 1,
  payload: undefined,
  search: async (payload: Partial<LinkAccountType> = {}, page = 1) => {
    set({
      error: undefined,
      loading: true,
      payload,
    })
    const result = await searchPatientsAction({
      ...defaultParams,
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
    })
  },

  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })

    get().search(get().payload, 1)
  },
}))

export { useLinkAccountStore }
