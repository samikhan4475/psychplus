import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getPatientProfileAction } from '@/actions'
import { PatientProfile } from '@/types'
import { filterPharmacyAction, searchPharmaciesAction } from './actions'
import { FilterSchemaType } from './filter-form'
import type { Pharmacy, PharmacyFilter, PharmacySearchParams } from './types'

interface Store {
  data?: Pharmacy[]
  pharmacies?: PharmacyFilter[]
  error?: string
  total?: number
  loading?: boolean
  modalLoading?: boolean
  patient?: PatientProfile
  activeTab: string
  viewedTabs: Set<string>
  errorMessage: string
  isErrorAlertOpen: boolean
  filterApplied: boolean
  setPharmacies: (value: PharmacyFilter[]) => void
  formValues?: Partial<FilterSchemaType>
  fetchPatientPharmacies: (
    patientId: string,
    formValues?: Partial<FilterSchemaType>,
  ) => void
  page: number
  payload?: PharmacySearchParams
  fetchPharmacies: (payload: PharmacySearchParams, page?: number) => void
  fetchPatient: (patientId: string) => void
  setActiveTab: (tab: string) => void
  setErrorMessage: (value: string) => void
  setIsErrorAlertOpen: (value: boolean) => void
  setFilterApplied: (value: boolean) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  pharmacies: undefined,
  error: undefined,
  total: undefined,
  loading: undefined,
  modalLoading: undefined,
  formValues: undefined,
  activeTab: 'ListView',
  isErrorAlertOpen: false,
  filterApplied: false,
  errorMessage: '',
  page: 1,
  viewedTabs: new Set(['ListView']),
  payload: undefined,
  setPharmacies: (pharmacies) => set({ pharmacies }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setIsErrorAlertOpen: (isErrorAlertOpen) => set({ isErrorAlertOpen }),
  setFilterApplied: (value: boolean) => set({ filterApplied: value }),
  fetchPatientPharmacies: async (
    patientId: string,
    formValues: Partial<FilterSchemaType> = {},
  ) => {
    set({
      data: undefined,
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await searchPharmaciesAction(patientId, {
      ...formValues,
      isOnlyDefaults: false,
      recordStatuses: ['Active'],
      patientIds: [patientId],
    })

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching Pharmacies')
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

  setActiveTab: (activeTab) => {
    const { viewedTabs } = get()
    viewedTabs.add(activeTab)

    set({
      activeTab,
      viewedTabs,
    })
  },

  fetchPharmacies: async (payload: PharmacySearchParams, page = 1) => {
    set({ error: undefined, modalLoading: true, payload })
    const result = await filterPharmacyAction(payload, page)
    if (result.state === 'error') {
      toast.error(result.error || 'Error while fetching pharmacies')
      return set({ error: result.error, modalLoading: false })
    }

    set({
      pharmacies: result.data.pharmacies,
      total: result.data.total,
      modalLoading: false,
    })
  },

  fetchPatient: async (patientId: string) => {
    set({
      error: undefined,
    })
    const patient = await getPatientProfileAction(patientId)
    if (patient.state === 'error') {
      return set({
        error: patient.error,
      })
    }
    set({
      patient: patient.data,
    })
  },
  next: () => {
    const nextPage = get().page + 1
    set({ page: nextPage })
    get().fetchPharmacies(get().payload!, nextPage)
  },

  prev: () => {
    const prevPage = get().page - 1
    if (prevPage >= 1) {
      set({ page: prevPage })
      get().fetchPharmacies(get().payload!, prevPage)
    }
  },

  jumpToPage: (page: number) => {
    if (page < 1) return
    set({ page })
    get().fetchPharmacies(get().payload!, page)
  },
}))

export { useStore }
