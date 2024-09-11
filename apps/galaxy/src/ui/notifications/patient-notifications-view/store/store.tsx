import { create } from 'zustand'
import type {
  GetPatientNotificationsResponse,
  NotificationSearchParams,
} from '../../types'
import { getPatientNotificationsAction } from '../actions'

interface StoreState {
  patientId: string
  data?: GetPatientNotificationsResponse
  loading?: boolean
  error?: string
  payload?: any
  search: (payload: NotificationSearchParams) => void
}

const useStore = create<StoreState>((set, get) => ({
  patientId: '',
  data: undefined,
  loading: true,
  error: undefined,
  search: async (payload: NotificationSearchParams) => {
    set({ error: undefined, loading: true, payload })

    const result = await getPatientNotificationsAction({
      payload,
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
