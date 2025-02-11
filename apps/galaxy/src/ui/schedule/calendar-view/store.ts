import { DateValue } from '@internationalized/date'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '../actions'
import { AppointmentParams, AvailableSlotsEvent } from '../types'
import {
  convertToZonedDate,
  getCurrentWeekStartDate,
  getDateString,
  getNextWeekStart,
  getPreviousWeekStart,
} from '../utils'

interface Store {
  data: AvailableSlotsEvent<Appointment>[]
  appointmentsMap: Map<string, AvailableSlotsEvent<Appointment>[]>
  weekStartDate: DateValue
  error?: string
  loading?: boolean
  formData?: AppointmentParams
  fetchData: (body?: AppointmentParams) => void
  fetchWeekOnNavigate: (start: DateValue, end: DateValue) => void
  addWeek: () => void
  subtractWeek: () => void
  setStartDate: (date: DateValue) => void
}

const useStore = create<Store>((set, get) => ({
  data: [],
  appointmentsMap: new Map(),
  error: undefined,
  loading: undefined,
  formData: undefined,
  weekStartDate: getCurrentWeekStartDate(),
  fetchData: async (body) => {
    set({
      error: undefined,
      loading: true,
      formData: body,
    })
    const { weekStartDate, appointmentsMap } = get()
    const startingDate = getDateString(weekStartDate)
    const endingDate = getDateString(weekStartDate.add({ days: 7 }))
    const params = { startingDate, endingDate, ...(body ?? {}) }
    const result = await getBookedAppointmentsAction({
      ...params,
      isServiceTimeDependant: true,
      isShowActiveVisits: true,
    })
    if (result.state === 'error') {
      toast.error(result.error || 'Failed to retrieve appointments')
      return set({
        error: result.error,
        loading: false,
      })
    }
    // revalidate cache on filter
    appointmentsMap.clear()
    const key = `${startingDate}-${endingDate}`
    const transformedData = transformInBookedAppointments(result.data)
    appointmentsMap.set(key, transformedData)
    set({
      loading: false,
      data: transformInBookedAppointments(result.data),
    })
  },
  fetchWeekOnNavigate: async (start, end) => {
    set({
      error: undefined,
      loading: true,
    })
    const startingDate = getDateString(start)
    const endingDate = getDateString(end)
    const { formData, appointmentsMap } = get()
    const key = `${startingDate}-${endingDate}`
    if (appointmentsMap.has(key)) {
      return set({
        loading: false,
        data: appointmentsMap.get(key),
      })
    }
    const result = await getBookedAppointmentsAction({
      startingDate,
      endingDate,
      isServiceTimeDependant: true,
      isShowActiveVisits: true,
      ...(formData ?? {}),
    })
    if (result.state === 'error') {
      toast.error(result.error || 'Failed to retrieve appointments')
      return set({
        error: result.error,
        loading: false,
      })
    }
    const transformedData = transformInBookedAppointments(result.data)
    appointmentsMap.set(key, transformedData)
    set({
      loading: false,
      data: transformedData,
    })
  },
  addWeek: () => {
    const { weekStartDate: currentStartDate, fetchWeekOnNavigate } = get()
    const nextWeekStart = getNextWeekStart(currentStartDate)
    set({
      weekStartDate: nextWeekStart,
    })
    fetchWeekOnNavigate(nextWeekStart, nextWeekStart.add({ days: 7 }))
  },
  subtractWeek: () => {
    const { weekStartDate: currentStartDate, fetchWeekOnNavigate } = get()
    const previousWeekStart = getPreviousWeekStart(currentStartDate)
    set({
      weekStartDate: previousWeekStart,
    })
    fetchWeekOnNavigate(previousWeekStart, previousWeekStart.add({ days: 7 }))
  },
  setStartDate: (date: DateValue) => {
    set({
      weekStartDate: date,
    })
  },
}))

const transformInBookedAppointments = (data: Appointment[]) =>
  data.map((appointment) => {
    const duration = appointment.appointmentDuration ?? 20
    const start = convertToZonedDate(
      appointment.appointmentDate,
      appointment.locationTimezoneId,
    )
    const end = new Date(start.getTime() + duration * 60000)
    const title = `${appointment.name} (${appointment.visitType})`

    return {
      start,
      end,
      title,
      data: {
        ...appointment,
      },
    }
  })

export { useStore }
