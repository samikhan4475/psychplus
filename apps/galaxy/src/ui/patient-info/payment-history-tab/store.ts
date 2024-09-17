import { create } from 'zustand'
import { getPatientPaymentHistoriesAction } from './actions'
import { PaymentFilterSchemaType } from './filter-form'
import type { GetPaymentHistoryData } from './types'

interface Store {
  data?: GetPaymentHistoryData
  error?: string
  loading?: boolean
  formValues?: Partial<PaymentFilterSchemaType>
  fetchPatientPaymentHistories: (
    formValues?: Partial<PaymentFilterSchemaType>,
  ) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  formValues: undefined,
  fetchPatientPaymentHistories: async (
    formValues: Partial<PaymentFilterSchemaType> = {},
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await getPatientPaymentHistoriesAction({
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
}))

export { useStore }
