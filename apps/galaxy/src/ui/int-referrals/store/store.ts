import { createContext } from 'react'
import toast from 'react-hot-toast'
import { createStore as zustandCreateStore } from 'zustand'
import { PatientReferral, SelectOptionType, Sort, StaffResource } from '@/types'
import {
  getLocationOptionsAction,
  getProviderOptionsAction,
  getStaffOptionsAction,
  searchPatientReferralsAction,
} from '@/ui/referrals/patient-referrals-widget/actions'
import { getNewSortDir } from '@/utils'
import type {
  GetPatientReferralsResponse,
  PatientReferralsPayload,
} from '../types'

interface StoreState {
  data?: GetPatientReferralsResponse
  error?: string
  staffError?: string
  loading?: boolean
  page: number
  formValues?: Partial<PatientReferralsPayload>
  pageCache: Record<number, GetPatientReferralsResponse>
  showFilters: boolean
  staff?: StaffResource
  providersList?: SelectOptionType[]
  getProvidersList: () => void
  locationsList?: SelectOptionType[]
  getLocationsList: () => void
  fetchPatientReferrals: (
    formValues?: Partial<PatientReferralsPayload>,
    page?: number,
    reset?: boolean,
  ) => void
  sort?: Sort
  providerOptions: SelectOptionType[]
  setData: (data: PatientReferral[]) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
  refetch: () => void
  jumpToPage: (page: number) => void
  toggleFilters: () => void
  fetchStaffOptions: (roleCode: string[], isProvider?: boolean) => void
}

type Store = ReturnType<typeof createStore>

const createStore = () => {
  return zustandCreateStore<StoreState>()((set, get) => ({
    providerOptions: [],
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
    providersList: [],
    locationsList: [],
    getProvidersList: async () => {
      const result = await getProviderOptionsAction()

      if (result.state === 'error') {
        return set({
          error: result.error,
          loading: false,
        })
      }

      set({
        providersList: result.data,
      })
    },
    getLocationsList: async () => {
      const result = await getLocationOptionsAction()

      if (result.state === 'error') {
        return set({
          error: result.error,
          loading: false,
        })
      }

      set({
        locationsList: result.data,
      })
    },
    setData: (referrals) =>
      set({ data: { referrals, total: get().data?.total } }),
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
        patientIds: [],
        payload: formValues,
        page,
        IsIncludeInsurance: true,
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
        page,
      })
    },
    fetchStaffOptions: async (roleCode) => {
      const result = await getStaffOptionsAction(roleCode)
      if (result.state === 'error') {
        return toast.error(result.error)
      }
      set({ providerOptions: result?.data ?? [] })
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

export { createStore, StoreContext, type Store }
