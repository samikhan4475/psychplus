import { create } from 'zustand'
import { Sort } from '@/types'
import { searchOrganizationUsersAction } from './actions'
import { Users, UsersSearchParam } from './types'

interface Store {
  data?: Users[]
  error?: string
  sort?: Sort
  loading?: boolean
  showFilters: boolean
  formValues?: Partial<UsersSearchParam>
  search: (formValues?: Partial<UsersSearchParam>) => void
  toggleFilters: () => void
}

const useStore = create<Store>()((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  showFilters: true,
  formValues: undefined,
  toggleFilters: () => set({ showFilters: !get().showFilters }),
  search: async (formValues: Partial<UsersSearchParam> = {}) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await searchOrganizationUsersAction(formValues)

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
}))

export { useStore }
