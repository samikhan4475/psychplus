import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '@/ui/schedule/actions'
import { AppointmentParams } from '@/ui/schedule/types'

const FOLLOW_UP_FILTERS_KEY = 'follow-up-filters'

interface StoreState {
  patientId: string
  data?: Appointment[]
  loading?: boolean
  error?: string
  payload?: AppointmentParams
  search: (payload: AppointmentParams) => void
  cachedFilters: string[]
  cachedFiltersList: string[]
  saveFilters: (filter: string[]) => void
  saveListFilters: (filters: string[]) => void
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      patientId: '',
      data: [],
      loading: true,
      error: undefined,
      search: async (payload: AppointmentParams) => {
        set({ error: undefined, loading: true, payload })

        const result = await getBookedAppointmentsAction(payload)

        if (result.state === 'error') {
          return set({
            error: result.error,
            loading: false,
          })
        }
        set({
          data: result.data,
          loading: false,
        })
      },
      providers: [],
      clinics: [],
      cachedFilters: [],
      cachedFiltersList: [],
      tableFilters: [],
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
    }),
    {
      name: FOLLOW_UP_FILTERS_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        cachedFilters: state.cachedFilters,
        cachedFiltersList: state.cachedFiltersList,
      }),
    },
  ),
)

export { useStore }
