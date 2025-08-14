import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Sort } from '@/types'
import { getCvxCodesAction } from '../actions/get-cvx-codes'
import { getImmunizationListAction } from '../actions/get-immunization-list'
import { IMMUNIZATION_TABLE_PAGE_SIZE } from '../constant'
import type {
  CvxCodes,
  ImmunizationDataResponse,
  ImmunizationPayload,
  ImmunizationResponseList,
} from '../types'

interface Store {
  data?: ImmunizationDataResponse[]
  error?: string
  total?: number
  loading?: boolean
  modalLoading?: boolean
  activeTab: string
  viewedTabs: Set<string>
  errorMessage: string
  isErrorAlertOpen: boolean
  filterApplied: boolean
  formValues?: Partial<ImmunizationPayload>
  currentAppointmentId: string
  pageCache: Record<number, ImmunizationResponseList>
  appointmentId: string
  loadingCvxCodes: boolean
  cvxCodesData?: CvxCodes[]
  fetchCvxCodes: (value: string) => void

  isDialogOpen: boolean
  dialogType: string
  editData?: ImmunizationDataResponse

  fetchImmunizations: (
    appointmentId: string,
    formValues?: Partial<ImmunizationPayload>,
    page?: number,
    sort?: Sort,
    reset?: boolean,
  ) => void
  page: number
  payload?: ImmunizationPayload
  setErrorMessage: (value: string) => void
  setIsErrorAlertOpen: (value: boolean) => void
  setFilterApplied: (value: boolean) => void
  setActiveTab: (tab: string) => void

  setDialogOpen: (open: boolean) => void
  setDialogType: (type: string) => void
  setEditData: (data?: ImmunizationDataResponse) => void

  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  refetch: () => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  total: undefined,
  loading: undefined,
  modalLoading: undefined,
  formValues: undefined,
  currentAppointmentId: '',
  pageCache: {},
  activeTab: 'ListView',
  isErrorAlertOpen: false,
  filterApplied: false,
  errorMessage: '',
  page: 1,
  viewedTabs: new Set(['ListView']),
  payload: undefined,
  appointmentId: '',
  loadingCvxCodes: false,
  cvxCodesData: undefined,

  isDialogOpen: false,
  dialogType: 'historical',
  editData: undefined,

  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setIsErrorAlertOpen: (isErrorAlertOpen) => set({ isErrorAlertOpen }),
  setFilterApplied: (value: boolean) => set({ filterApplied: value }),

  setActiveTab: (activeTab) => {
    const { viewedTabs } = get()
    viewedTabs.add(activeTab)

    set({
      activeTab,
      viewedTabs,
    })
  },

  setDialogOpen: (isDialogOpen) => set({ isDialogOpen }),
  setDialogType: (dialogType) => set({ dialogType }),
  setEditData: (editData) => set({ editData }),

  fetchImmunizations: async (
    appointmentId: string,
    formValues: Partial<ImmunizationPayload> = {},
    page = 1,
    sort?: Sort,
    reset = false,
  ) => {
    set({
      data: undefined,
      error: undefined,
      loading: true,
      formValues,
      page,
      currentAppointmentId: appointmentId,
      appointmentId: appointmentId,
    })

    const result = await getImmunizationListAction({
      appointmentId,
      payload: formValues,
      page,
      limit: IMMUNIZATION_TABLE_PAGE_SIZE,
      sort,
    })

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching immunizations')
      return set({
        error: result.error,
        loading: false,
      })
    }

    const immunizationData = {
      immunizationList: result.data.immunizationList,
      total: result.data.total,
    }

    set({
      data: result.data.immunizationList,
      total: result.data.total,
      loading: false,
      pageCache: reset
        ? { [page]: immunizationData }
        : { ...get().pageCache, [page]: immunizationData },
    })
  },

  refetch: () => {
    const { currentAppointmentId, payload, page, fetchImmunizations } = get()
    if (currentAppointmentId && payload) {
      fetchImmunizations(currentAppointmentId, payload, page, undefined, false)
    }
  },

  next: () => {
    const { page, payload, currentAppointmentId, pageCache } = get()
    const nextPage = page + 1
    set({ page: nextPage })

    if (pageCache[nextPage]) {
      set({
        data: pageCache[nextPage].immunizationList,
        total: pageCache[nextPage].total,
      })
    } else {
      get().fetchImmunizations(currentAppointmentId, payload, nextPage)
    }
  },

  prev: () => {
    const {
      page,
      pageCache,
      currentAppointmentId,
      payload,
      fetchImmunizations,
    } = get()
    const prevPage = page - 1
    if (prevPage < 1) return

    set({ page: prevPage })

    if (pageCache[prevPage]) {
      set({
        data: pageCache[prevPage].immunizationList,
        total: pageCache[prevPage].total,
      })
    } else {
      fetchImmunizations(currentAppointmentId, payload, prevPage)
    }
  },

  jumpToPage: (page: number) => {
    if (page < 1) return
    const { payload, currentAppointmentId, pageCache } = get()
    set({ page })
    if (pageCache[page]) {
      set({
        data: pageCache[page].immunizationList,
        total: pageCache[page].total,
      })
    } else {
      get().fetchImmunizations(currentAppointmentId, payload, page)
    }
  },

  fetchCvxCodes: async (value: string) => {
    set({ loadingCvxCodes: true })
    const response = await getCvxCodesAction(value)
    if (response.state === 'error') {
      toast.error('Failed to fetch CVX codes')
      set({ loadingCvxCodes: false })
      return
    }
    set({
      loadingCvxCodes: false,
      cvxCodesData: response.data,
    })
  },
}))

export { useStore }
