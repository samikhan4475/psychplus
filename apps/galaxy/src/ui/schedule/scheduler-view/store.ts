import { addDays, eachDayOfInterval, format } from 'date-fns'
import { create } from 'zustand'
import { AvailableSlotsParams } from '../types'
import { searchAppointmentsAction } from './actions/search-appointments'
import { AppointmentAvailability, AppointmentDate } from './types'
import toast from 'react-hot-toast'

interface Store {
  loading?: boolean
  error?: string
  data: AppointmentAvailability[]
  formData?: AvailableSlotsParams
  dates: AppointmentDate[]
  setDays?: (arg: Date) => void
  fetchAppointments: (params?: AvailableSlotsParams) => void
  setDates: (value: Date, noOfDays?: number) => void
}

const useStore = create<Store>((set) => ({
  loading: undefined,
  error: undefined,
  data: [],
  formData: undefined,
  dates: [],
  fetchAppointments: async (params) => {
    set({
      error: undefined,
      loading: true,
      formData: params,
    })
    const result = await searchAppointmentsAction(params ?? {})
    if (result.state === 'error') {
      toast.error(result.error || 'Failed to retrieve available slots')
      return set({
        error: result.error,
        loading: false,
      })
    }

    set({
      data: result.data || [],
      loading: false,
    })
  },
  setDates: (startDate, noOfDays = 13) => {
    set({
      dates: createDays(startDate, noOfDays),
    })
  },
}))

const createDays = (startDate: Date, noOfDays = 13): AppointmentDate[] => {
  const dates = eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, noOfDays),
  })

  return dates.map((date) => ({
    date: date,
    day: format(date, 'EEE'),
    monthAndDay: format(date, 'MM/dd'),
  }))
}

export { useStore }
