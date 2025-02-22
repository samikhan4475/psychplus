import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Encounter, SelectOptionType, Sort, StaffResource } from '@/types'
import { getNewSortDir } from '@/utils'
import {
  getCosignersAction,
  getServiceList,
  getVisitTypesAction,
} from './actions'
import { ServiceFiltersSchemaType } from './filter-form'
import { LocationService } from './types'

interface Store {
  data?: LocationService[]
  visitTypes: Encounter[]
  error?: string
  total: number
  cosigners: StaffResource[]
  loading: boolean
  cosignersLoading: boolean
  fetchVisitTypes: (locationType: string) => void
  fetchCosigners: () => void
  providerOptions: SelectOptionType[]
  formValues?: Partial<ServiceFiltersSchemaType>
  fetchServices: (
    formValues?: Partial<ServiceFiltersSchemaType>,
    page?: number,
    reset?: boolean,
  ) => void
  showFilters: boolean
  toggleFilters: () => void
  pageCache: Record<number, LocationService[]>
  next: () => void
  prev: () => void
  sortData: (column: string) => void
  sort?: Sort
  refetch: () => void
  jumpToPage: (page: number) => void
  page: number
}
const useStore = create<Store>()((set, get) => ({
  visitTypes: [],
  cosigners: [],
  total: 20,
  page: 1,
  cosignersLoading: false,
  providerOptions: [],
  loading: false,
  pageCache: {},
  showFilters: true,
  toggleFilters: () => set({ showFilters: !get().showFilters }),
  fetchServices: async (formValues, page = 1, reset = false) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })
    const result = await getServiceList()
    if (result.state === 'error') {
      return set({ error: result.error, loading: false })
    }
    set({
      data: result.data,
      total: result.total,
      loading: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
      page,
    })
  },

  fetchVisitTypes: async (locationType: string) => {
    set({ loading: true })
    const response = await getVisitTypesAction(locationType)
    if (response.state === 'error') {
      set({ loading: false })
      return toast.error(response?.error)
    }
    set({ loading: false, visitTypes: response?.data ?? [] })
  },

  fetchCosigners: async () => {
    set({ cosignersLoading: true })
    const response = await getCosignersAction()
    if (response.state === 'error') {
      set({ cosignersLoading: false })

      return toast.error(response?.error)
    }
    set({ cosignersLoading: false, cosigners: response?.data ?? [] })
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }

    get().fetchServices(get().formValues, page)
  },
  prev: () => {
    const page = get().page - 1

    if (page < 1) return

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }

    get().fetchServices(get().formValues, page)
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
    get().fetchServices(get().formValues, page)
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().fetchServices(get().formValues, 1, true)
  },
  refetch: () => {
    get().fetchServices(get().formValues, get().page, true)
  },
}))

export { useStore }
