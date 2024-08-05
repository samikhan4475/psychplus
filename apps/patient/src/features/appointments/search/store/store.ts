import { getLocalTimeZone, today } from '@internationalized/date'
import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { CareTeamMember } from '@psychplus-v2/types'
import {
  getCalendarDate,
  getCalendarDateLabel,
  getProviderTypeLabel,
} from '@psychplus-v2/utils'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { searchAppointmentsAction } from '@/features/appointments/search/actions'
import {
  APPOINTMENTS_SEARCH_SESSION_KEY,
  AppointmentSortBy,
} from '@/features/appointments/search/constants'
import type {
  AppointmentAvailability,
  CurrentLocation,
} from '@/features/appointments/search/types'

interface Store {
  loading: boolean
  error?: string
  data?: AppointmentAvailability[]
  providerType: ProviderType
  appointmentType: AppointmentType
  zipCode?: string
  language?: string
  sortBy?: AppointmentSortBy
  startingDate: string
  location?: CurrentLocation
  careTeam: CareTeamMember[]
  setStartingDate: (value: string) => void
  setProviderType: (value: ProviderType) => void
  setAppointmentType: (value: AppointmentType) => void
  setZipCode: (value: string) => void
  setLanguage: (value: string) => void
  setSortBy: (value: AppointmentSortBy) => void
  setLocation: (value: CurrentLocation) => void
  setLoading: (value: boolean) => void
  setCareTeam: (value: CareTeamMember[]) => void
  careTeamMember: () => CareTeamMember | undefined
  search: () => void
  prev: () => void
  next: () => void
  cache: { [key: string]: AppointmentAvailability[] | undefined }
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      loading: false,
      error: undefined,
      data: undefined,
      providerType: ProviderType.Psychiatrist,
      appointmentType: AppointmentType.Virtual,
      zipCode: undefined,
      language: undefined,
      sortBy: undefined,
      startingDate: getCalendarDateLabel(today(getLocalTimeZone())),
      careTeam: [],
      setStartingDate: (startingDate) => set({ startingDate }),
      setCareTeam: (careTeam) => set({ careTeam }),
      setProviderType: (providerType) => set({ providerType }),
      setAppointmentType: (appointmentType) => {
        set((prev) => ({
          appointmentType,
          location:
            appointmentType === AppointmentType.Virtual
              ? undefined
              : prev.location,
          zipCode: prev.zipCode,
        }))
        set({
          appointmentType,
        })
      },
      setZipCode: (zipCode) =>
        set({
          zipCode,
          location: undefined,
        }),
      setLanguage: (language) => set({ language }),
      setSortBy: (sortBy) => set({ sortBy }),
      setLocation: (location) => {
        set({
          location,
          appointmentType: AppointmentType.InPerson,
          zipCode: undefined,
        })
      },
      careTeamMember: () =>
        get().careTeam.find(
          (member) =>
            member.specialist === getProviderTypeLabel(get().providerType),
        ),
      search: async () => {
        const cacheKey = getCacheKey({
          appointmentType: get().appointmentType,
          providerType: get().providerType,
          startingDate: get().startingDate,
          zipCode: get().zipCode,
          location: get().location,
        })

        if (get().cache[cacheKey]) {
          set({
            data: get().cache[cacheKey],
            loading: false,
          })

          return
        }

        set({
          loading: true,
          error: undefined,
          data: undefined,
        })

        const result = await searchAppointmentsAction({
          appointmentType: get().appointmentType,
          providerType: get().providerType,
          startingDate: get().startingDate,
          maxDaysOutToLook: 7,
          postalCode: get().zipCode ?? null,
          includeDistance: get().appointmentType === AppointmentType.InPerson,
          includeStaffBio: false,
          currentLocation: get().location ?? null,
          nextAvailableAppointment: true,
        })

        if (result.state === 'error') {
          set({
            loading: false,
            error: result.error,
          })
        } else {
          set({
            loading: false,
            data: result.data,
            cache: { ...get().cache, [cacheKey]: result.data },
          })
        }
      },
      prev: () => {
        const newStartingDate = getCalendarDate(get().startingDate).subtract({
          days: 7,
        })

        set({
          startingDate: getCalendarDateLabel(newStartingDate),
        })
      },
      next: () => {
        const newStartingDate = getCalendarDate(get().startingDate).add({
          days: 7,
        })

        set({
          startingDate: getCalendarDateLabel(newStartingDate),
        })
      },
      cache: {},
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: APPOINTMENTS_SEARCH_SESSION_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        appointmentType: state.appointmentType,
        providerType: state.providerType,
        zipCode: state.zipCode,
      }),
      skipHydration: true,
    },
  ),
)

const getCacheKey = ({
  appointmentType,
  providerType,
  startingDate,
  zipCode = 'none',
  location,
}: {
  appointmentType: AppointmentType
  providerType: ProviderType
  startingDate: string
  zipCode?: string
  location?: CurrentLocation
}) => {
  const locationKey = location ? 'location' : 'none'
  return `${appointmentType}:${providerType}:${startingDate}:${zipCode}:${locationKey}`
}

export { useStore }
