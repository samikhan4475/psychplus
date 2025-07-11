import toast from 'react-hot-toast'
import { create } from 'zustand'
import * as api from '@/api/api.client'
import { GET_WAITLISTS_ENDPOINT } from '@/api/endpoints'
import { Sort, WaitlistPayload, WaitlistResponse } from '@/types'

interface Option {
  label: string
  value: string
}

interface Store {
  sort?: Sort
  data?: WaitlistResponse[]
  error?: string
  providers: Option[]
  setProviders: (providers: Option[]) => void
  providerLoading?: boolean
  setProviderLoading: (loading: boolean) => void
  loading?: boolean
  formValues?: Partial<WaitlistPayload>
  setFormValues: (values: Partial<WaitlistPayload>) => void
  resetFormValues: () => void
  page: number
  pageCache: Record<number, WaitlistResponse>
  fetchWaitlists: (payload?: WaitlistPayload) => Promise<void>
}

const useStore = create<Store>((set, get) => ({
  page: 1,
  pageCache: {},
  sort: undefined,
  providers: [],
  setProviders: (providers) => set({ providers }),
  providerLoading: false,
  setProviderLoading: (loading) => set({ providerLoading: loading }),
  data: undefined,
  error: undefined,
  loading: false,
  formValues: undefined,
  setFormValues: (values) => set({ formValues: values }),
  resetFormValues: () => set({ formValues: undefined }),

  fetchWaitlists: async (payload?: WaitlistPayload) => {
    set({ loading: true, error: undefined })

    const url = GET_WAITLISTS_ENDPOINT

    try {
      const response = await api.POST<WaitlistResponse[]>(url, {
        ...payload,
        isIncludeStaff: true,
        isIncludePatient: true,
      })

      if (response.state === 'error') {
        set({ loading: false, error: response.error })
        toast.error(response.error)
      } else {
        set({ data: response.data, loading: false })
      }
    } catch (error) {
      set({ loading: false, error: 'Unexpected error' })
      toast.error('Unexpected error occurred')
    }
  },
}))

export { useStore }
