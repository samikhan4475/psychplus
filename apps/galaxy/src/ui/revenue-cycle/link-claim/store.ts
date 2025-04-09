import { create } from 'zustand'
import { Appointment, PatientAppointments, Sort } from '@/types'
import { getBookedAppointmentsAction } from '@/ui/schedule/actions'
import { AppointmentParams } from '@/ui/schedule/types'
import { getNewSortDir } from '@/utils'
import { getPatientAppointments } from '../actions'

interface Store {
  data?: PatientAppointments[]
  loading?: boolean
  error?: string
  sort?: Sort
  page: number
  payload?: AppointmentParams
  pageCache: Record<number, PatientAppointments[]>
  jumpToPage: (page: number) => void
  next: () => void
  prev: () => void
  sortData: (column: string) => void
  fetchAppointments: (
    payload?: AppointmentParams,
    page?: number,
    reset?: boolean,
  ) => void
}

const useStore = create<Store>((set, get) => ({
  data: [],
  sort: undefined,
  page: 1,
  pageCache: {},
  fetchAppointments: async (
    payload?: AppointmentParams,
    page = 1,
    reset = false,
  ) => {
    set({
      payload: payload,
      error: undefined,
      loading: true,
    })
    const result = await getPatientAppointments({ ...payload }, get().sort)
    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }
    set({
      data: result.data,
      loading: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
    })
  },

  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }

    get().fetchAppointments(get().payload, page)
  },
  prev: () => {
    const page = get().page - 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().fetchAppointments(get().payload, page)
  },
  jumpToPage: (page: number) => {
    if (page < 1) {
      return
    }

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().fetchAppointments(get().payload, page)
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().fetchAppointments(get().payload, 1, true)
  },
}))

export { useStore }
