import { create } from 'zustand'
import { getPatientPolicyAndConsetntAction } from './actions'
import { PolicyConsentFilterSchemaType } from './filter-form'
import type { GetPolicyConsentsData } from './types'

interface Store {
  data?: GetPolicyConsentsData
  error?: string
  loading?: boolean
  formValues?: Partial<PolicyConsentFilterSchemaType>
  fetchPolicies: (formValues?: Partial<PolicyConsentFilterSchemaType>) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  page: 1,
  formValues: undefined,
  pageCache: {},
  fetchPolicies: async (
    formValues: Partial<PolicyConsentFilterSchemaType> = {},
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await getPatientPolicyAndConsetntAction({
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
