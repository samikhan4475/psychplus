import { getLocalTimeZone } from '@internationalized/date'
import {
  AppointmentType,
  DEFAULT_APPOINTMENT_CACHE_TIME,
  ProviderType,
} from '@psychplus-v2/constants'
import {
  AppointmentsCacheMap,
  CareTeamMember,
  GeoCoordinates,
  LocationProvider,
} from '@psychplus-v2/types'
import {
  getAppointmentCacheKey,
  getCalendarDate,
  getCalendarDateLabel,
  getProviderTypeLabel,
  isAppointmentsFreshEntry,
  transformLocationProvidersRequest,
  transformLocationProvidersResponse,
} from '@psychplus-v2/utils'
import { unstable_batchedUpdates } from 'react-dom'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  searchAppointmentsAction,
  searchLocationsProvidersAction,
} from '@/features/appointments/search/actions'
import {
  APPOINTMENTS_SEARCH_SESSION_KEY,
  AppointmentSortBy,
} from '@/features/appointments/search/constants'
import type {
  AppointmentAvailability,
  CurrentBookingAppointmentData,
} from '@/features/appointments/search/types'
import { ToastData } from '@/providers'
import { create } from '@/stores/common-store'
import { getProviderTypeLabelNormalized } from '@/widgets/schedule-appointment-list/utils'
import { transformResponseData } from '../actions/data'
import { getStartOfWeek } from '../utils'

interface Store {
  loading: boolean
  error?: string
  data?: AppointmentAvailability[]
  locationsProvidersData?: LocationProvider[]
  providerType: ProviderType
  appointmentType: AppointmentType
  zipCode?: string
  language?: string
  sortBy?: AppointmentSortBy
  startingDate: string
  location?: GeoCoordinates
  careTeam: CareTeamMember[]
  state?: string
  stateCode: string
  maxDistanceInMiles?: string
  setStartingDate: (value: string) => void
  setProviderType: (value: ProviderType) => void
  setAppointmentType: (value: AppointmentType) => void
  setZipCode: (value: string) => void
  setLanguage: (value: string) => void
  setState: (value: string) => void
  setStateCode: (value: string) => void
  setMaxDistanceInMiles: (value: string) => void
  setSortBy: (value: AppointmentSortBy) => void
  setLocation: (value: GeoCoordinates) => void
  setLoading: (value: boolean) => void
  setCareTeam: (value: CareTeamMember[]) => void
  setData: (data: AppointmentAvailability[] | undefined) => void
  careTeamMember: () => CareTeamMember | undefined
  // search: () => void
  searchLocationsProviders: (toast?: (data: ToastData) => void) => void
  prev: () => void
  next: () => void
  cache: AppointmentsCacheMap<AppointmentAvailability[]>
  setCache: (key: string, data: AppointmentAvailability[]) => void
  currentBookingAppointmentData?: CurrentBookingAppointmentData
  setCurrentBookingAppointmentData: (
    data: CurrentBookingAppointmentData,
  ) => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      loading: false,
      error: undefined,
      data: undefined,
      locationsProvidersData: undefined,
      providerType: ProviderType.Psychiatrist,
      appointmentType: AppointmentType.Virtual,
      zipCode: undefined,
      language: undefined,
      sortBy: undefined,
      state: undefined,
      startingDate: getStartOfWeek(new Date()),
      careTeam: [],
      stateCode: '',
      maxDistanceInMiles: undefined,
      currentBookingAppointmentData: undefined,
      setCurrentBookingAppointmentData: (data) =>
        set({ currentBookingAppointmentData: data }),
      setCache: (key, data) =>
        set({
          cache: {
            [key]: {
              data,
              timestamp: Date.now(),
            },
          },
        }),
      setStateCode: (stateCode) => set({ stateCode }),
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
      setState: (state) => set({ state }),
      careTeamMember: () =>
        get().careTeam.find(
          (member) =>
            member.specialist === getProviderTypeLabel(get().providerType),
        ),
      search: async () => {
        const cacheKey = getAppointmentCacheKey({
          appointmentType: get().appointmentType,
          providerType: get().providerType,
          startingDate: get().startingDate,
          zipCode: get().zipCode,
          location: get().location,
          state: get().state,
        })

        if (get().cache[cacheKey]) {
          set({
            data: get().cache[cacheKey].data,
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
          type: get().appointmentType,
          providerType: get().providerType,
          startingDate: get().startingDate,
          maxDaysOutToLook: 7,
          postalCode: get().zipCode ?? null,
          state: get().state ?? null,
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
          const data = transformResponseData(result.data, getLocalTimeZone())
          set({
            loading: false,
            data: data,
            cache: {
              ...get().cache,
              [cacheKey]: { data, timestamp: Date.now() },
            },
          })
        }
      },

      setData: (data) => {
        set({ data })
      },
      searchLocationsProviders: async (toast) => {
        const cacheKey = getAppointmentCacheKey({
          maxDistanceInMiles: get().maxDistanceInMiles,
          appointmentType: get().appointmentType,
          providerType: get().providerType,
          startingDate: get().startingDate,
          zipCode: get().zipCode,
          location: get().location,
          state: get().state,
        })

        const entry = get().cache[cacheKey]
        if (isAppointmentsFreshEntry(entry, DEFAULT_APPOINTMENT_CACHE_TIME)) {
          set({ data: entry.data, loading: false, error: undefined })
          return
        }

        set({
          loading: true,
          error: undefined,
          data: undefined,
        })

        const stateCode = get().stateCode
        const providerType = get().providerType
        const providerTypeLabel = getProviderTypeLabelNormalized(providerType)
        const appointmentType = get().appointmentType

        const payload = transformLocationProvidersRequest({
          maxDistanceInMiles: get().maxDistanceInMiles,
          appointmentType,
          providerType,
          providerTypeLabel,
          zipCode: get().zipCode,
          stateCode,
        })
        const [res1, res2] = await Promise.all([
          searchLocationsProvidersAction({ ...payload, limit: 10, offset: 0 }),
          searchLocationsProvidersAction({
            ...payload,
            limit: 10,
            offset: 10,
          }),
        ])

        const errorMessage = [res1, res2].find(
          (r) => r.state !== 'success',
        )?.error

        if (errorMessage || res1.state === 'error' || res2.state === 'error') {
          toast?.({
            type: 'error',
            title: errorMessage,
          })
          set({
            loading: false,
            error: errorMessage,
          })
          return
        }

        const rawData = [
          ...(res1?.data?.locationsProviders ?? []),
          ...(res2?.data?.locationsProviders ?? []),
        ]

        const baseTransformed = transformLocationProvidersResponse({
          response: rawData,
          providerType: providerType,
          providerTypeLabel,
          appointmentType: get().appointmentType,
        })
        unstable_batchedUpdates(() => {
          set({
            loading: false,
            data: baseTransformed,
            cache: {
              ...get().cache,
              [cacheKey]: { data: baseTransformed, timestamp: Date.now() },
            },
          })
        })
        if (rawData.length && rawData.length < res1?.data?.total) {
          const res3 = await searchLocationsProvidersAction({
            ...payload,
            limit: 100,
            offset: 20,
          })

          if (res3.state === 'success') {
            const combined = transformLocationProvidersResponse({
              response: [...rawData, ...res3.data.locationsProviders],
              providerType,
              providerTypeLabel,
              appointmentType: appointmentType,
            })
            unstable_batchedUpdates(() => {
              set({
                data: combined,
                cache: {
                  ...get().cache,
                  [cacheKey]: { data: combined, timestamp: Date.now() },
                },
              })
            })
          }
        }
      },
      setMaxDistanceInMiles: (value) => {
        set({
          maxDistanceInMiles: value,
        })
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
      partialize: (state) => {
        const freshEntries = Object.entries(state.cache).filter(([, entry]) =>
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
          appointmentType: state.appointmentType,
          providerType: state.providerType,
          zipCode: state.zipCode,
          stateCode: state.stateCode,
          ...(trimmedCache ? { cache: trimmedCache } : {}),
        }
      },
      skipHydration: true,
    },
  ),
)

export { useStore }
