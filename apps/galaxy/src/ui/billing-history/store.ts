import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getPatientBillingHistoryAction } from './actions'
import type { BillingHistoryParams, GetBillingHistoryData } from './types'

interface Store {
  data?: GetBillingHistoryData
  error?: string
  loading?: boolean
  showFilters: boolean
  formValues?: Partial<BillingHistoryParams>
  fetchBillingHistory: (
    patientId: string,
    formValues?: Partial<BillingHistoryParams>,
  ) => void
  toggleFilters: () => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  formValues: undefined,
  showFilters: true,
  insuranceProviders: [],
  toggleFilters: () => set({ showFilters: !get().showFilters }),

  fetchBillingHistory: async (
    patientId: string,
    formValues: Partial<BillingHistoryParams> = {},
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await getPatientBillingHistoryAction(patientId, {
      ...formValues,
    })

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching Billing History')
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
