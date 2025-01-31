import toast from 'react-hot-toast'
import { create } from 'zustand'
import { SelectOptionType, Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import {
  getFacilityAdmissionHistoryAction,
  getPatientTransactionHistoryAction,
  getScheduleStatusHistoryAction,
} from './actions'
import { getPatientSchedulingHistoryAction } from './client-actions'
import type {
  GetSchedulingHistoryListResponse,
  PatientFacilityHistory,
  PatientScheduleStatusHistory,
  PatientTransactionHistory,
  SchedulingHistoryData,
  SchedulingHistoryPayload,
} from './types'

interface Store {
  sort?: Sort
  sortData: (column: string) => void
  data?: GetSchedulingHistoryListResponse
  patientFacilityData?: PatientFacilityHistory[]
  patientScheduleStatusData?: PatientScheduleStatusHistory[]
  patientTransactionData?: PatientTransactionHistory[]
  error?: string
  visitTypes: SelectOptionType[]
  setVisitTypes: (visitTypes: SelectOptionType[]) => void
  patientFacilityError?: string
  patientScheduleStatusError?: string
  patientTransactionHistoryError?: string
  loading?: boolean
  patientFacilityLoader?: boolean
  patientScheduleStatusLoading?: boolean
  patientTransactionHistoryLoading?: boolean
  formValues?: Partial<SchedulingHistoryPayload>
  isTCMVisitType: boolean
  setIsTCMVisitType: (isTCMVisitType: boolean) => void
  fetchSchedulingHistory: (
    patientId: string,
    formValues?: Partial<SchedulingHistoryPayload>,
    page?: number,
    reset?: boolean,
  ) => void
  schedulingHistories: SchedulingHistoryData[]
  schedulingHistoryPayload?: Partial<SchedulingHistoryPayload>

  fetchPatientFacilityHistory: (
    patientId: string,
    appointmentId: number,
  ) => void
  patientFacilityHistories: PatientFacilityHistory[]

  fetchPatientSchedulingStatusHistory: (
    patientId: string,
    appointmentId: number,
  ) => void
  patientScheduleStatusHistories: PatientScheduleStatusHistory[]

  fetchPatientTransactionHistory: (
    patientId: string,
    appointmentId: number,
  ) => void
  patientTransactionHistories: PatientTransactionHistory[]
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  page: number
  pageCache: Record<number, GetSchedulingHistoryListResponse>
  patientId: string
  setPatientId: (id: string) => void
}

const useStore = create<Store>((set, get) => ({
  patientId: '',
  page: 1,
  pageCache: {},
  sort: undefined,
  visitTypes: [],
  setVisitTypes: (visitTypes) => set({ visitTypes }),
  data: undefined,
  patientFacilityData: undefined,
  patientScheduleStatusData: undefined,
  patientTransactionData: undefined,
  error: undefined,
  patientFacilityError: undefined,
  patientScheduleStatusError: undefined,
  patientTransactionHistoryError: undefined,
  loading: undefined,
  patientFacilityLoader: undefined,
  patientScheduleStatusLoading: undefined,
  patientTransactionHistoryLoading: undefined,
  formValues: undefined,
  schedulingHistories: [],
  patientFacilityHistories: [],
  patientScheduleStatusHistories: [],
  patientTransactionHistories: [],
  isTCMVisitType: false,
  setIsTCMVisitType: (isTCMVisitType) => {
    set({ isTCMVisitType })
  },

  fetchSchedulingHistory: async (
    patientId,
    formValues: Partial<SchedulingHistoryPayload> = {},
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
      schedulingHistoryPayload: formValues,
    })

    const result = await getPatientSchedulingHistoryAction({
      sort: get().sort,
      patientId,
      payload: formValues,
      page,
    })
    if (result.state === 'error') {
      toast.error(result.error || 'Failed to fetch scheduling history')
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
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().fetchSchedulingHistory(
      get().patientId,
      get().schedulingHistoryPayload,
      1,
      true,
    )
  },
  fetchPatientFacilityHistory: async (patientId, appointmentId) => {
    set({
      patientFacilityError: undefined,
      patientFacilityLoader: true,
    })
    const result = await getFacilityAdmissionHistoryAction(
      patientId,
      appointmentId,
    )
    if (result.state === 'error') {
      return set({
        patientFacilityError: result.error,
        patientFacilityLoader: false,
      })
    }

    set({
      patientFacilityData: result.data,
      patientFacilityLoader: false,
    })
  },

  fetchPatientSchedulingStatusHistory: async (patientId, appointmentId) => {
    set({
      patientScheduleStatusError: undefined,
      patientScheduleStatusLoading: true,
    })
    const result = await getScheduleStatusHistoryAction(
      patientId,
      appointmentId,
    )

    if (result.state === 'error') {
      return set({
        patientScheduleStatusError: result.error,
        patientScheduleStatusLoading: false,
      })
    }
    set({
      patientScheduleStatusData: result.data,
      patientScheduleStatusLoading: false,
    })
  },

  fetchPatientTransactionHistory: async (patientId, appointmentId) => {
    set({
      patientTransactionHistoryError: undefined,
      patientTransactionHistoryLoading: true,
    })
    const result = await getPatientTransactionHistoryAction(
      patientId,
      appointmentId,
    )
    if (result.state === 'error') {
      return set({
        patientTransactionHistoryError: result.error,
        patientTransactionHistoryLoading: false,
      })
    }

    set({
      patientTransactionData: result.data,
      patientTransactionHistoryLoading: false,
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

    get().fetchSchedulingHistory(
      get().patientId,
      get().schedulingHistoryPayload,
      page,
    )
  },
  prev: () => {
    const page = get().page - 1

    set({
      data: get().pageCache[page],
      page,
    })
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
    const { patientId, fetchSchedulingHistory, schedulingHistoryPayload } =
      get()
    fetchSchedulingHistory(patientId, schedulingHistoryPayload, page)
  },
  setPatientId: (id: string) => set({ patientId: id }),
}))

export { useStore }
