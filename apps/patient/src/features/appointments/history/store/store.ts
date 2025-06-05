import { Appointment } from '@psychplus-v2/types'
import { create } from 'zustand'
import { getAppointmentsHistory } from '../api/get-appointments-history'

interface AppointmentsStore {
  loading: boolean
  error?: string
  data: Appointment[]
  total: number
  page: number
  setPage: (page: number) => void
  fetchAppointments: (page?: number, limit?: number) => Promise<void>
}

const useStore = create<AppointmentsStore>((set, get) => ({
  loading: false,
  error: undefined,
  data: [],
  total: 0,
  page: 1,

  setPage: (page) => set({ page }),

  fetchAppointments: async (limit, page = 1) => {
    try {
      set({ loading: true, error: undefined })

      const response = await getAppointmentsHistory(page, limit)

      if (response.state === 'error') {
        set({ error: response.error, loading: false })
        return
      }

      const rawHeaders = response.headers
      const headersObj = Object.fromEntries(rawHeaders)
      const total = Number(headersObj['psychplus-totalresourcecount'] || '0')

      set({
        data: response.data.previousAppointments,
        total,
        page,
        loading: false,
      })
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch appointments',
        loading: false,
      })
    }
  },
}))

export { useStore }
