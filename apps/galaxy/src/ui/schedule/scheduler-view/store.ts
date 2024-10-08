import { addDays, eachDayOfInterval, format } from 'date-fns'
import { create } from 'zustand'
import { searchAppointmentsAction } from './actions/search-appointments'
import { AppointmentAvailability, AppointmentDate } from './types'


interface Store {
  loading?: boolean
  error?: string
  data: AppointmentAvailability[]
  dates: AppointmentDate[]
  setDays?: (arg: Date) => void
  fetchAppointments: () => void
  setDates: (value: Date) => void
}

const useStore = create<Store>((set) => ({
  loading: undefined,
  error: undefined,
  data: [],
  dates: [],
  fetchAppointments: async () => {
    set({
      error: undefined,
      loading: true,
    })
    const result = await searchAppointmentsAction()
    if (result.state === 'error') {
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
  setDates: (startDate) => {
    set({
      dates: createDays(startDate),
    })
  },
}))

const createDays = (startDate: Date = new Date()): AppointmentDate[] => {
  const dates = eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, 13),
  })

  return dates.map((date) => ({
    date: date,
    day: format(date, 'EEE'),
    monthAndDay: format(date, 'MM/dd'),
  }))
}

export { useStore }