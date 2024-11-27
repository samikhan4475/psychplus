import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getLabResultsAction } from '../actions'

interface Store {
  data?: any //TODO: replace any with proper type once data schema is decided on the backend
  error?: string
  loading?: boolean

  formValues?: Partial<any>

  fetchLabResults: (formValues?: Partial<any>) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  formValues: undefined,

  fetchLabResults: async (formValues: Partial<any> = {}) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await getLabResultsAction()

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
