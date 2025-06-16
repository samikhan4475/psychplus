'use client'

import { DEFAULT_APPOINTMENT_CACHE_TIME } from '@psychplus-v2/constants'
import {
  getAppointmentCacheKey,
  isAppointmentsFreshEntry,
  transformLocationProvidersRequest,
} from '@psychplus-v2/utils'
import { unstable_batchedUpdates } from 'react-dom'
import { type StateCreator } from 'zustand'
import { searchLocationsProvidersAction } from '@/features/appointments/search/actions'
import {
  getProviderTypeLabelNormalized,
  transformStaffWithClinicsAndSlots,
} from '../utils'
import { AppointmentFiltersState } from './types'

const createAppointmentFiltersStore: StateCreator<AppointmentFiltersState> = (
  set,
  get,
) => ({
  filters: {
    providerType: '',
    appointmentType: '',
    zipCode: '',
    sortBy: '',
    language: '',
    startingDate: '',
  },
  data: undefined,
  cache: {},
  boolean: false,
  searchLocationsProviders: async (filters, toast) => {
    const {
      startingDate,
      zipCode,
      state,
      providerType,
      appointmentType,
      ...rest
    } = filters

    const providerTypeLabel = getProviderTypeLabelNormalized(providerType)

    const cacheKey = getAppointmentCacheKey({
      startingDate,
      zipCode,
      state,
      appointmentType,
      providerType,
      maxDistanceInMiles: rest.maxDistanceInMiles,
    })
    const entry = get().cache[cacheKey]
    if (isAppointmentsFreshEntry(entry, DEFAULT_APPOINTMENT_CACHE_TIME)) {
      set({ data: entry.data, loading: false })
      return
    }

    set({
      loading: true,
      data: undefined,
    })

    const payload = transformLocationProvidersRequest({
      maxDistanceInMiles: rest.maxDistanceInMiles,
      appointmentType,
      providerType,
      providerTypeLabel,
      zipCode,
      stateCode: rest.stateCode,
    })
    const [res1, res2] = await Promise.all([
      searchLocationsProvidersAction({ ...payload, limit: 10, offset: 0 }),
      searchLocationsProvidersAction({
        ...payload,
        limit: 10,
        offset: 10,
      }),
    ])

    const errorMessage = [res1, res2].find((r) => r.state !== 'success')?.error

    if (errorMessage || res1.state === 'error' || res2.state === 'error') {
      toast?.({
        type: 'error',
        title: errorMessage,
      })

      set({
        loading: false,
      })
      return
    }

    const rawData = [
      ...(res1?.data?.locationsProviders ?? []),
      ...(res2?.data?.locationsProviders ?? []),
    ]

    const baseTransformed = transformStaffWithClinicsAndSlots({
      response: rawData,
      providerType: providerType,
      providerTypeLabel,
      appointmentType,
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
        const combined = transformStaffWithClinicsAndSlots({
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
  handleFiltersChange: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }))
  },
})

export { createAppointmentFiltersStore }
