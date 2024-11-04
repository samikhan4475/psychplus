import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getOptionalDateString, sanitizeFormData } from '@/utils'
import { getPatientPaymentsAction } from './actions'
import { SchemaType } from './filter-form'
import type { GetPatientPaymentsData } from './types'

interface Store {
  data?: GetPatientPaymentsData
  error?: string
  loading?: boolean
  formValues?: Partial<SchemaType>
  fetchPatientPayments: (
    patientId: string,
    formValues?: Partial<SchemaType>,
  ) => void
  setSelectedRows: (value: number[]) => void
  selectedRows: number[]
}

const useStore = create<Store>((set) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  formValues: undefined,
  selectedRows: [],
  setSelectedRows: (selectedRows) => set({ selectedRows }),
  fetchPatientPayments: async (
    patientId: string,
    formValues: Partial<SchemaType> = {},
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const sanitizedFormData = sanitizeFormData({
      ...formValues,
      fromDate: getOptionalDateString(formValues.fromDate),
      toDate: getOptionalDateString(formValues.toDate),
    })

    const result = await getPatientPaymentsAction(patientId, sanitizedFormData)

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
