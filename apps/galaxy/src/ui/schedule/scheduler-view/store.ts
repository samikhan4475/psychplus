import { getLocalTimeZone, startOfWeek, today } from '@internationalized/date'
import { addDays, eachDayOfInterval, format } from 'date-fns'
import { create } from 'zustand'
import { AvailableSlotsParams } from '../types'
import { searchAppointmentsAction } from './actions/search-appointments'
import { AppointmentAvailability, AppointmentDate } from './types'

interface Store {
  loading?: boolean
  error?: string
  data: AppointmentAvailability[]
  dates: AppointmentDate[]
  setDays?: (arg: Date) => void
  fetchAppointments: (params?: AvailableSlotsParams) => void
  setDates: (value: Date, noOfDays?: number) => void
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
    const result = await searchAppointmentsAction(params ?? {})
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
  setDates: (startDate, noOfDays = 13) => {
    set({
      dates: createDays(startDate, noOfDays),
    })
  },
}))

const createDays = (
  startDate: Date = new Date(),
  noOfDays = 13,
): AppointmentDate[] => {
  const startOfWeek = startDate ? startDate : getCurrentWeekStart()
  const dates = eachDayOfInterval({
    start: startOfWeek,
    end: addDays(startDate, noOfDays),
  })

  return dates.map((date) => ({
    date: date,
    day: format(date, 'EEE'),
    monthAndDay: format(date, 'MM/dd'),
  }))
}

const getCurrentWeekStart = (): Date => {
  const currentDate = today(getLocalTimeZone())
  const weekStartDate = startOfWeek(currentDate, 'en-US').add({ days: 1 })
  return new Date(weekStartDate.toString())
}

export { useStore }
