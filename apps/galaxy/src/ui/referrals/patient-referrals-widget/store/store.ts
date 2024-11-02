import { createContext } from 'react'
import { createStore as zustandCreateStore } from 'zustand'
import { Sort, StaffResource } from '@/types'
import { getNewSortDir } from '@/utils'
import { searchPatientReferralsAction } from '../actions'
import type {
  GetPatientReferralsResponse,
  PatientReferralsPayload,
} from '../types'

interface StoreInit {
  patientId: string
}

interface StoreState {
  patientId: string
  data?: GetPatientReferralsResponse
  error?: string
  staffError?: string
  loading?: boolean
  page: number
  formValues?: Partial<PatientReferralsPayload>
  pageCache: Record<number, GetPatientReferralsResponse>
  showFilters: boolean
  staff?: StaffResource
  fetchPatientReferrals: (
    formValues?: Partial<PatientReferralsPayload>,
    page?: number,
    reset?: boolean,
  ) => void
  sort?: Sort
  sortData: (column: string) => void
  next: () => void
  prev: () => void
  refetch: () => void
  jumpToPage: (page: number) => void
  toggleFilters: () => void
}

type Store = ReturnType<typeof createStore>

const createStore = (init: StoreInit) => {
  return zustandCreateStore<StoreState>()((set, get) => ({
    patientId: init.patientId,
    staff: undefined,
    data: undefined,
    error: undefined,
    staffError: undefined,
    loading: undefined,
    formValues: undefined,
    sort: undefined,
    page: 1,
    pageCache: {},
    showFilters: true,

    toggleFilters: () => set({ showFilters: !get().showFilters }),
    fetchPatientReferrals: async (
      formValues: Partial<PatientReferralsPayload> = {},
      page = 1,
      reset = false,
    ) => {
      set({
        error: undefined,
        loading: true,
        formValues,
      })

      const result = await searchPatientReferralsAction({
        patientIds: [get().patientId],
        payload: formValues,
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
        page,
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

      get().fetchPatientReferrals(get().formValues, page)
    },
    prev: () => {
      const page = get().page - 1

      if (get().pageCache[page]) {
        return set({
          data: get().pageCache[page],
          page,
        })
      }
      get().fetchPatientReferrals(get().formValues, page)
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
      get().fetchPatientReferrals(get().formValues, page)
    },
    sortData: (column) => {
      set({
        sort: {
          column,
          direction: getNewSortDir(column, get().sort),
        },
      })

      get().fetchPatientReferrals(get().formValues, 1, true)
    },
    refetch: () => {
      get().fetchPatientReferrals(get().formValues, 1, true)
    },
  }))
}

const StoreContext = createContext<Store | null>(null)

export { createStore, StoreContext, type Store, type StoreInit }
