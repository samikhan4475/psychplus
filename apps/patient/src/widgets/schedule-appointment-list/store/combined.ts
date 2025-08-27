import { DEFAULT_APPOINTMENT_CACHE_TIME } from '@psychplus-v2/constants'
import { isAppointmentsFreshEntry } from '@psychplus-v2/utils'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { APPOINTMENTS_SEARCH_SESSION_PUBLIC_KEY } from '@/features/appointments/search/constants'
import { createAppointmentFiltersStore } from './appointments-filters-store'
import { createAppointmentsStore } from './appointments-store'
import { createPatientStore } from './patient-store'
import { createProviderIdsStore } from './provider-ids'
import { type StoreType } from './types'

const useStore = createWithEqualityFn<StoreType>()(
  persist(
    combineStateCreators(
      createAppointmentsStore,
      createCodeSetStore,
      createAppointmentFiltersStore,
      createPatientStore,
      createProviderIdsStore,
    ),

    {
      name: APPOINTMENTS_SEARCH_SESSION_PUBLIC_KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => {
        const { cache = {}, ...rest } = state

        const freshEntries = Object.entries(cache).filter(([, entry]) =>
          isAppointmentsFreshEntry(entry, DEFAULT_APPOINTMENT_CACHE_TIME),
        )

        const trimmedCache =
          freshEntries.length === 0
            ? undefined
            : Object.fromEntries(
                freshEntries
                  .sort(([, a], [, b]) => b.timestamp - a.timestamp)
                  .slice(0, 5),
              )

        return {
          ...rest,
          ...(trimmedCache ? { cache: trimmedCache } : {}),
        }
      },
    },
  ),
)

export { useStore }
