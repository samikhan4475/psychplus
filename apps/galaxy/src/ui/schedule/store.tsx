import { CalendarDate } from '@internationalized/date'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  getCurrentWeekStartDate,
  getNextWeekStart,
  getPreviousWeekStart,
} from './utils'
import { ROUNDING_FILTERS_KEY } from './constants'

interface Option {
  value: string
  label: string
}

interface Store {
  providers: Option[]
  clinics: Option[]
  weekStartDate: CalendarDate
  cachedFilters: string[]
  cachedFiltersList: string[]
  tableFilters: string[]
  setProvidersOptions: (options: Option[]) => void
  setClinicsOptions: (options: Option[]) => void
  addWeek: () => void
  subtractWeek: () => void
  saveFilters: (filter: string[]) => void
  saveListFilters: (filters: string[]) => void
  updateTableFilters: (filter: string[]) => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      providers: [],
      clinics: [],
      weekStartDate: getCurrentWeekStartDate(),
      cachedFilters: [],
      cachedFiltersList: [],
      tableFilters: [],
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
      saveFilters: (filters: string[]) => {
        set({
          cachedFilters: filters,
        })
      },
      saveListFilters: (filters: string[]) => {
        set({
          cachedFiltersList: filters,
        })
      },
      updateTableFilters: (filters: string[]) => {
        set({
          tableFilters: filters,
        })
      },
    }),
    {
      name: ROUNDING_FILTERS_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        cachedFilters: state.cachedFilters,
        cachedFiltersList: state.cachedFiltersList,
      }),
    },
  ),
)

export { useStore }
