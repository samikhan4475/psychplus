import { CalendarDate } from '@internationalized/date'
import { create } from 'zustand'
import {
  getCurrentWeekStartDate,
  getNextWeekStart,
  getPreviousWeekStart,
} from './utils'

interface Option {
  value: string
  label: string
}

interface Store {
  providers: Option[]
  clinics: Option[]
  weekStartDate: CalendarDate
  setProvidersOptions: (options: Option[]) => void
  setClinicsOptions: (options: Option[]) => void
  addWeek: () => void
  subtractWeek: () => void
}

const useStore = create<Store>((set, get) => ({
  providers: [],
  clinics: [],
  weekStartDate: getCurrentWeekStartDate(),

  setProvidersOptions: (options) => {
    set({
      providers: options,
    })
  },

  setClinicsOptions: (options) => {
    set({
      clinics: options,
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
}))

export { useStore }
