import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '../actions'
import { AppointmentParams, AvailableSlotsEvent, View } from '../types'
import { convertToZonedDate, getWeekStartDateFormatted } from '../utils'

interface ActionParams {
  params?: AppointmentParams
  view?: string
}

interface Store {
  roundingViewData: Appointment[]
  listViewData: Appointment[]
  calendarViewData: AvailableSlotsEvent<Appointment>[]
  error?: string
  loading?: boolean
  fetchData: (arg?: ActionParams) => void
}

const useBookedAppointmentsStore = create<Store>((set) => ({
  roundingViewData: [],
  listViewData: [],
  calendarViewData: [],
  error: undefined,
  loading: undefined,
  fetchData: async (options) => {
    set({
      error: undefined,
      loading: true,
    })
    const startingDate = getWeekStartDateFormatted()
    const params = { startingDate, ...(options?.params ?? {}) }
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
      case View.Calendar:
        return set({
          calendarViewData: transformInBookedAppointments(result.data),
          loading: false,
        })
      default:
        return set({
          roundingViewData: result.data,
          listViewData: result.data,
          calendarViewData: transformInBookedAppointments(result.data),
          loading: false,
        })
    }
  },
}))

const transformInBookedAppointments = (data: Appointment[]) =>
  data.map((appointment) => {
    const start = convertToZonedDate(
      appointment.appointmentDate,
      appointment.locationTimezoneId,
    )
    const end = new Date(start.getTime() + 20 * 60000) // Assuming 20 mins duration; adjust if needed
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

export { useBookedAppointmentsStore }
