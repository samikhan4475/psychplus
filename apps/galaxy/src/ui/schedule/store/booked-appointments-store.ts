import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '../actions'
import { AppointmentParams, AvailableSlotsEvent, TabValue } from '../types'
import { convertToZonedDate, getWeekStartDateFormatted } from '../utils'

interface ActionParams {
  params?: AppointmentParams
  view?: string
}

interface Store {
  roundingViewData: Appointment[]
  listViewData: Appointment[]
  calendarViewData: AvailableSlotsEvent<Appointment>[]
  roundingViewFormData: AppointmentParams
  listViewFormData: AppointmentParams
  getFormValues: (tab: string) => AppointmentParams
  error?: string
  loading?: boolean
  fetchData: (arg?: ActionParams) => void
  setRoundingViewFormData: (data: AppointmentParams) => void
  setListViewFormData: (data: AppointmentParams) => void
}

const useBookedAppointmentsStore = create<Store>((set, get) => ({
  roundingViewData: [],
  listViewData: [],
  calendarViewData: [],
  roundingViewFormData: {},
  listViewFormData: {},
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
      toast.error(result.error || 'Failed to retrieve appointments data')
      return set({
        error: result.error,
        loading: false,
      })
    }
    switch (options?.view) {
      case TabValue.Rounding:
        return set({
          roundingViewData: result.data.filter(
            (appointment) => !appointment.isServiceTimeDependent,
          ),
          loading: false,
        })
      case TabValue.List:
        return set({
          listViewData: result.data,
          loading: false,
        })
      case TabValue.Calendar:
        return set({
          calendarViewData: transformInBookedAppointments(result.data),
          loading: false,
        })
      default:
        return set({
          roundingViewData: result.data.filter(
            (appointment) => !appointment.isServiceTimeDependent,
          ),
          listViewData: result.data,
          calendarViewData: transformInBookedAppointments(result.data),
          loading: false,
        })
    }
  },
  getFormValues: (tab) => {
    switch (tab) {
      case TabValue.List:
        return get().listViewFormData
      case TabValue.Rounding:
        return get().roundingViewFormData
      default:
        return {}
    }
  },
  setRoundingViewFormData: (data) => {
    set({
      roundingViewFormData: data,
    })
  },
  setListViewFormData: (data) => {
    set({
      listViewFormData: data,
    })
  },
}))

const transformInBookedAppointments = (data: Appointment[]) =>
  data
    .map((appointment) => {
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
    .filter((appointment) => appointment.data.isServiceTimeDependent)

export { useBookedAppointmentsStore }
