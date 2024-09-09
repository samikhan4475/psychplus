import { create } from 'zustand'
import { getPatientBillingHistoryAction, getProvidersAction } from './actions'
import { BillingFilterSchemaType } from './filter-form'
import type { GetBillingHistoryData, SelectOptionType } from './types'

interface Store {
  data?: GetBillingHistoryData
  error?: string
  loading?: boolean
  showFilters: boolean
  formValues?: Partial<BillingFilterSchemaType>
  fetch: (formValues?: Partial<BillingFilterSchemaType>) => void
  fetchProviders: () => void
  toggleFilters: () => void
  providers: SelectOptionType[]
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  formValues: undefined,
  showFilters: true,
  providers: [],
  toggleFilters: () => set({ showFilters: !get().showFilters }),

  fetch: async (formValues: Partial<BillingFilterSchemaType> = {}) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await getPatientBillingHistoryAction({
      ...formValues,
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
    })
  },

  fetchProviders: async () => {
    const result = await getProvidersAction()

    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }

    set({
      providers: result.data,
      loading: false,
    })
  },
}))

export { useStore }
