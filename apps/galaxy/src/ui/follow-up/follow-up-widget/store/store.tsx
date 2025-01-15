import { create } from 'zustand'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '@/ui/schedule/client-actions'
import { AppointmentParams } from '@/ui/schedule/types'

interface StoreState {
  data?: Appointment[]
  setData: (data: Appointment[]) => void
  loading: boolean
  error?: string
  payload?: AppointmentParams
  search: (payload: AppointmentParams) => void
}

const useStore = create<StoreState>((set, get) => ({
  data: [],
  loading: false,
  error: undefined,
  setData: (data) => set({ data }),
  search: async (payload: AppointmentParams) => {
    set({ error: undefined, loading: true, payload })

    const result = await getBookedAppointmentsAction({
      ...payload,
      isFollowUp: true,
    })

    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
        data: [],
      })
    }

    set({
      data: result.data,
      loading: false,
    })
  },
}))

export { useStore }
