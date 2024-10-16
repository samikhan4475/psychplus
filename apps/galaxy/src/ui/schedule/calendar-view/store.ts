import { DateValue } from '@internationalized/date'
import { create } from 'zustand'
import {
  getCurrentWeekStartDate,
  getNextWeekStart,
  getPreviousWeekStart,
} from '../utils'

interface Store {
  weekStartDate: DateValue
  addWeek: () => void
  subtractWeek: () => void
  setStartDate: (date: DateValue) => void
}

const useStore = create<Store>((set, get) => ({
  weekStartDate: getCurrentWeekStartDate(),
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
      weekStartDate: date
    })
  }
}))

export { useStore }
