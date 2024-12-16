import toast from 'react-hot-toast'
import { create } from 'zustand'
import { fetchLabResultsAction } from '../actions'
import { LabResultResponse, LabResultsPayload } from '../types'

interface Store {
  data?: LabResultResponse[]
  error?: string
  loading?: boolean

  fetchLabResults: (payload: LabResultsPayload) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  formValues: undefined,

  fetchLabResults: async (payload: LabResultsPayload) => {
    set({
      error: undefined,
      loading: true,
    })

    const result = await fetchLabResultsAction(payload)

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
