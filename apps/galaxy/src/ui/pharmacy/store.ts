import toast from 'react-hot-toast'
import { create } from 'zustand'
import { searchPharmaciesAction } from './actions'
import { FilterSchemaType } from './filter-form'
import type { Pharmacy } from './types'

interface Store {
  data?: Pharmacy[]
  error?: string
  loading?: boolean
  formValues?: Partial<FilterSchemaType>
  fetchPatientPharmacies: (
    patientId: string,
    formValues?: Partial<FilterSchemaType>,
  ) => void
}

const useStore = create<Store>((set) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  formValues: undefined,

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
      isOnlyDefaults: false,
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
}))

export { useStore }
