import { CalendarDate } from '@internationalized/date'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ROUNDING_FILTERS_KEY } from '../constants'
import { TabValue } from '../types'
import {
  getCurrentWeekStartDate,
  getNextWeekStart,
  getPreviousWeekStart,
} from '../utils'

interface Store {
  visitedTabs: Set<string>
  activeTab: string
  weekStartDate: CalendarDate
  cachedFiltersRounding: string[]
  cachedFiltersList: string[]
  tableFilters: string[]
  providerCodingFilters: string[],
  setActiveTab?: (tab: string) => void
  addWeek: () => void
  subtractWeek: () => void
  saveRoundingFilters: (filter: string[]) => void
  saveListFilters: (filters: string[]) => void
  saveProviderCodingFilters: (filters: string[]) => void
  updateTableFilters: (filter: string[]) => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      activeTab: TabValue.List,
      visitedTabs: new Set([TabValue.List]),
      weekStartDate: getCurrentWeekStartDate(),
      cachedFiltersRounding: [],
      cachedFiltersList: [],
      providerCodingFilters: [],
      tableFilters: [],
      setActiveTab: (activeTab) => {
        const visitedTabs = get().visitedTabs
        visitedTabs.add(activeTab)
        set({
          activeTab,
          visitedTabs,
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
      saveRoundingFilters: (filters: string[]) => {
        set({
          cachedFiltersRounding: filters,
        })
      },
      saveListFilters: (filters: string[]) => {
        set({
          cachedFiltersList: filters,
        })
      },
      saveProviderCodingFilters: (filters: string[]) => {
        set({
          providerCodingFilters: filters,
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
        cachedFilters: state.cachedFiltersRounding,
        cachedFiltersList: state.cachedFiltersList,
      }),
    },
  ),
)

export { useStore }
