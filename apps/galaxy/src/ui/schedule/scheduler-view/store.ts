import { addDays, eachDayOfInterval, format } from 'date-fns'
import { create } from 'zustand'
import { searchAppointmentsAction } from './actions/search-appointments'
import { AppointmentAvailability, AppointmentDate } from './types'
import { AvailableSlotsParams } from '../types'
import { getLocalTimeZone, startOfWeek, today } from '@internationalized/date'


interface Store {
  loading?: boolean
  error?: string
  data: AppointmentAvailability[]
  dates: AppointmentDate[]
  fetchAppointments: (params?: AvailableSlotsParams) => void
  setDates: (value?: Date) => void
}

const useStore = create<Store>((set) => ({
  loading: undefined,
  error: undefined,
  data: [],
  dates: [],
  fetchAppointments: async (params) => {
    set({
      error: undefined,
      loading: true,
    })
    const result = await searchAppointmentsAction(params?? {})
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
  const startOfWeek = startDate? startDate: getCurrentWeekStart()
  const dates = eachDayOfInterval({
    start: startOfWeek,
    end: addDays(startDate, 13),
  })

  return dates.map((date) => ({
    date: date,
    day: format(date, 'EEE'),
    monthAndDay: format(date, 'MM/dd'),
  }))
}

const getCurrentWeekStart = (): Date => {
  const currentDate = today(getLocalTimeZone())
  const weekStartDate = startOfWeek(currentDate, 'en-US').add({ days: 1})
  return new Date(weekStartDate.toString())
}

export { useStore }