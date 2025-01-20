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
  loading?: boolean
  modalLoading?: boolean
  patient?: PatientProfile
  activeTab: string
  viewedTabs: Set<string>
  errorMessage: string
  isErrorAlertOpen: boolean
  setPharmacies: (value: PharmacyFilter[]) => void
  formValues?: Partial<FilterSchemaType>
  fetchPatientPharmacies: (
    patientId: string,
    formValues?: Partial<FilterSchemaType>,
  ) => void
  fetchPharmacies: (payload: PharmacySearchParams) => void
  fetchPatient: (patientId: string) => void
  setActiveTab: (tab: string) => void
  setErrorMessage: (value: string) => void
  setIsErrorAlertOpen: (value: boolean) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  pharmacies: undefined,
  error: undefined,
  loading: undefined,
  modalLoading: undefined,
  formValues: undefined,
  activeTab: 'ListView',
  isErrorAlertOpen: false,
  errorMessage: '',
  viewedTabs: new Set(['ListView']),
  setPharmacies: (pharmacies) => set({ pharmacies }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setIsErrorAlertOpen: (isErrorAlertOpen) => set({ isErrorAlertOpen }),
  fetchPatientPharmacies: async (
    patientId: string,
    formValues: Partial<FilterSchemaType> = {},
  ) => {
    set({
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

  fetchPharmacies: async (payload: PharmacySearchParams) => {
    set({ error: undefined, modalLoading: true })

    const result = await filterPharmacyAction(payload)

    if (result.state === 'error') {
      toast.error(result.error || 'Error while fetching pharmacies')
      return set({ error: result.error, modalLoading: false })
    }

    set({
      pharmacies: result.data,
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
}))

export { useStore }
