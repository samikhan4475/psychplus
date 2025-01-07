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
  weekStartDate: DateValue
  error?: string
  loading?: boolean
  formData?: AppointmentParams
  fetchData: (body?: AppointmentParams) => void
  addWeek: () => void
  subtractWeek: () => void
  setStartDate: (date: DateValue) => void
}

const useStore = create<Store>((set, get) => ({
  data: [],
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
    const startingDate = getDateString(getCurrentWeekStartDate())
    const params = { startingDate, ...(body?? {})}
    const result = await getBookedAppointmentsAction({
      ...params,
      isServiceTimeDependant: true,
    })
    if (result.state === 'error') {
      toast.error(result.error || 'Failed to retrieve appointments')
      return set({
        error: result.error,
        loading: false,
      })
    }
    set({
      loading: false,
      data: transformInBookedAppointments(result.data),
    })
  },
  addWeek: () => {
    const currentStartDate = get().weekStartDate
    set({
      weekStartDate: getNextWeekStart(currentStartDate),
    })
  },
  subtractWeek: () => {
    const currentStartDate = get().weekStartDate
    set({
      weekStartDate: getPreviousWeekStart(currentStartDate),
    })
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
