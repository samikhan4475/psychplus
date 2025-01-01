import { getLocalTimeZone, today } from '@internationalized/date'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction, getUnitsGroupsAction } from '../actions'
import { AppointmentParams, GetUnitsGroupsResponse } from '../types'
import { getDateString } from '../utils'

interface Store {
  appointments: Appointment[]
  data: GetUnitsGroupsResponse
  error?: string
  loading?: boolean
  formData?: AppointmentParams
  page: number
  totalRecords: number
  pageCache: Record<number, Appointment[]>
  fetchAppointments: (
    body?: AppointmentParams,
    page?: number,
    reset?: boolean,
  ) => void
  fetchUnitsAndGroups: (arg: string[]) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
}

const useStore = create<Store>((set, get) => ({
  appointments: [],
  data: { serviceGroups: [], serviceUnits: [], serviceRooms: [] },
  formData: undefined,
  page: 1,
  totalRecords: 0,
  pageCache: {},
  error: undefined,
  loading: undefined,
  fetchAppointments: async (body, page = 1, reset = true) => {
    set({
      error: undefined,
      loading: true,
      formData: body,
    })
    const startingDate = getDateString(today(getLocalTimeZone()))
    const requestBody = body ? body : { startingDate }
    const result = await getBookedAppointmentsAction(
      { ...requestBody, isServiceTimeDependant: false },
      page,
    )
    if (result.state === 'error') {
      toast.error(result.error || 'Failed to retrieve appointments')
      return set({
        error: result.error,
        loading: false,
      })
    }

    set({
      appointments: result.data,
      loading: false,
      totalRecords: result.total,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
      page,
    })
  },
  fetchUnitsAndGroups: async (serviceIds) => {
    set({
      error: undefined,
    })
    const result = await getUnitsGroupsAction(serviceIds)
    if (result.state === 'error') {
      toast.error('Failed to retrieve units, groups, and rooms')
      return set({
        error: result.error,
      })
    }

    set({
      data: result.data,
    })
  },
  next: () => {
    const page = get().page + 1
    if (get().pageCache[page]) {
      return set({
        appointments: get().pageCache[page],
        page,
      })
    }
    get().fetchAppointments(get().formData, page, false)
  },
  prev: () => {
    const page = get().page - 1
    if (get().pageCache[page]) {
      return set({
        appointments: get().pageCache[page],
        page,
      })
    }
    get().fetchAppointments(get().formData, page, false)
  },
  jumpToPage: (page) => {
    if (page < 1) return
    if (get().pageCache[page]) {
      return set({
        appointments: get().pageCache[page],
        page,
      })
    }
    get().fetchAppointments(get().formData, page, false)
  },
}))

export { useStore }
