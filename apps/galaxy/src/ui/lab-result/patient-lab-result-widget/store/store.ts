import toast from 'react-hot-toast'
import { create } from 'zustand'
import { LabResult } from '@/types'
import { fetchLabResultsAction } from '../actions'
import { LabResultResponse, LabResultsPayload } from '../types'

interface Store {
  data?: LabResultResponse[]
  error?: string
  loading?: boolean
  updateLabResults: (result: LabResult) => void
  fetchLabResults: (payload: LabResultsPayload) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  formValues: undefined,

  updateLabResults: (result) => {
    const { data } = get()

    const labResults = data?.map((labResult) => {
      if (labResult?.orderId === result?.orderId) {
        const newResults = [...labResult.results]
        const index = newResults?.findIndex((item) => item?.id === result?.id)
        if (index === -1) {
          newResults.unshift(result)
        } else {
          newResults[index] = { ...result }
        }
        return {
          ...labResult,
          results: newResults,
        }
      }
      return labResult
    })

    set({
      data: labResults,
    })
  },

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
