import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getBookedAppointmentsAction } from '../actions'
import { AppointmentParams, View } from '../types'
import { Appointment } from '@/types'
import { getLocalTimeZone, today } from '@internationalized/date'

interface ActionParams {
  params?: AppointmentParams
  view?: string
}

interface Store {
  roundingViewData: Appointment[]
  listViewData: Appointment[]
  error?: string
  loading?: boolean
  fetchData: (arg?: ActionParams) => void
}

const useBookedAppointmentsStore = create<Store>((set) => ({
  roundingViewData: [],
  listViewData: [],
  error: undefined,
  loading: undefined,
  fetchData: async (options) => {
    set({
      error: undefined,
      loading: true,
    })
    const startDate = today(getLocalTimeZone())
    const year = startDate.year
    const month = `${startDate.month}`.padStart(2, '0')
    const day = `${startDate.day}`.padStart(2, '0')
    const startingDate = `${year}-${month}-${day}`
    const params = {startingDate, ...(options?.params?? {})}
    const result = await getBookedAppointmentsAction(params)
    if (result.state === 'error') {
      toast.error('Failed to retrieve appointments data')
      return set({
        error: result.error,
        loading: false,
      })
    }
    switch (options?.view) {
      case View.Rounding:
        return set({
          roundingViewData: result.data,
          loading: false,
        })
      case View.List:
        return set({
          listViewData: result.data,
          loading: false,
        })
      default:
        return set({
          roundingViewData: result.data,
          listViewData: result.data,
          loading: false,
        })
    }
  },
}))

export { useBookedAppointmentsStore }
