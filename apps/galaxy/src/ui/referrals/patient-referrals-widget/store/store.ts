import { createContext } from 'react'
import toast from 'react-hot-toast'
import { createStore as zustandCreateStore } from 'zustand'
import { SelectOptionType, Sort, StaffResource } from '@/types'
import { getNewSortDir } from '@/utils'
import {
  getStaffOptionsAction,
  searchPatientReferralsAction,
} from '../client-actions'
import type {
  GetPatientReferralsResponse,
  PatientReferral,
  PatientReferralsPayload,
} from '../types'
import { getDefaultReferralStatuses } from '../utils'

interface StoreInit {
  patientId: string
  appointmentId?: string
  isTabView?: boolean
}

interface StoreState {
  patientId: string
  appointmentId?: string
  isTabView?: boolean
  data?: GetPatientReferralsResponse
  error?: string
  staffError?: string
  loading?: boolean
  page: number
  formValues?: Partial<PatientReferralsPayload>
  pageCache: Record<number, GetPatientReferralsResponse>
  showFilters: boolean
  staff?: StaffResource
  providerOptions: SelectOptionType[]
  fetchPatientReferrals: (
    formValues?: Partial<PatientReferralsPayload>,
    page?: number,
    reset?: boolean,
  ) => void
  fetchStaffOptions: (roleCode: string[]) => void
  sort?: Sort
  setData: (data: PatientReferral[]) => void
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
    appointmentId: init?.appointmentId,
    isTabView: init?.isTabView,
    staff: undefined,
    data: undefined,
    error: undefined,
    staffError: undefined,
    loading: undefined,
    formValues: undefined,
    sort: undefined,
    providerOptions: [],
    page: 1,
    pageCache: {},
    showFilters: true,
    setData: (referrals) =>
      set({ data: { referrals, total: get().data?.total } }),
    toggleFilters: () => set({ showFilters: !get().showFilters }),
    fetchPatientReferrals: async (
      formValues: Partial<PatientReferralsPayload> = {},
      page = 1,
      reset = false,
    ) => {
      const appointmentId = get().appointmentId

      set({
        error: undefined,
        loading: true,
        formValues,
      })

      const payload = {
        ...formValues,
        ...(appointmentId && !get().isTabView
          ? { resourceStatusList: getDefaultReferralStatuses() }
          : {}),
      }
      const result = await searchPatientReferralsAction({
        patientIds: [get().patientId],
        payload,
        page,
      })

      if (result.state === 'error') {
        toast.error(result.error)
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

export { createStore, StoreContext, type Store, type StoreInit }
