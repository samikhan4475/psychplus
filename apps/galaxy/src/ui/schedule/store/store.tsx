import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { CACHED_FILTERS_KEY, TIMEZONE_TYPES } from '../constants'
import { TabValue } from '../types'

interface Store {
  visitedTabs: Set<string>
  activeTab: string
  cachedFiltersRounding: string[]
  cachedFiltersList: string[]
  tableFilters: string[]
  providerCodingFilters: string[]
  timezoneType: TIMEZONE_TYPES
  setTimezoneType: (timeZone: TIMEZONE_TYPES) => void
  setActiveTab?: (tab: string) => void
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
      cachedFiltersRounding: [],
      cachedFiltersList: [],
      providerCodingFilters: [],
      tableFilters: [],
      timezoneType: TIMEZONE_TYPES.LOCATION_PREFERRED,
      setTimezoneType: (timeZone) => {
        set({ timezoneType: timeZone })
      },
      setActiveTab: (activeTab) => {
        const visitedTabs = get().visitedTabs
        visitedTabs.add(activeTab)
        set({
          activeTab,
          visitedTabs,
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
      name: CACHED_FILTERS_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        cachedFiltersRounding: state.cachedFiltersRounding,
        cachedFiltersList: state.cachedFiltersList,
        providerCodingFilters: state.providerCodingFilters,
        activeTab: state.activeTab,
      }),
    },
  ),
)

export { useStore }
