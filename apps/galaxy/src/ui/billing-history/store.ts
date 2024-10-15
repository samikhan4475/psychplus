import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getPatientBillingHistoryAction } from './actions'
import { BillingFilterSchemaType } from './filter-form'
import { transformOut } from './transform'
import type { GetBillingHistoryData } from './types'

interface Store {
  data?: GetBillingHistoryData
  error?: string
  loading?: boolean
  showFilters: boolean
  formValues?: Partial<BillingFilterSchemaType>
  fetchBillingHistory: (
    patientId: string,
    formValues?: Partial<BillingFilterSchemaType>,
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
    formValues: Partial<BillingFilterSchemaType> = {},
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await getPatientBillingHistoryAction(
      patientId,
      transformOut(formValues),
    )

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
