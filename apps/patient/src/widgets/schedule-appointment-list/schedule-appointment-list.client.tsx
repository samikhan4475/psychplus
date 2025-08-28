'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  AppointmentType,
  CODESETS,
  ProviderType,
} from '@psychplus-v2/constants'
import { Flex } from '@radix-ui/themes'
import format from 'date-fns/format'
import { useDebounce } from 'use-debounce'
import { useShallow } from 'zustand/react/shallow'
import { getAppointmentAvailabilityForUnauthenticatedUser } from '@psychplus/appointments/api.client'
import { isMobile } from '@psychplus/utils/client'
import { getZipcodeInfo } from '@psychplus/utils/map'
import { formatDateYmd } from '@psychplus/utils/time'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeClosePopover,
} from '@psychplus/widgets/hooks'
import { enums, PSYCHPLUS_LIVE_URL } from '@/constants'
import { SERVICE_TYPES, SORT_TYPES, VISIT_TYPES } from '@/constants/appointment'
import { LoadingPlaceholder } from '@/features/appointments/search/ui/search-appointments-view/loading-placeholder.tsx'
import { getStartOfWeek } from '@/features/appointments/search/utils'
import { useDeepCompareEffect } from '@/hooks'
import { useCodesetCodes, useToast } from '@/providers'
import { AvailabilityList, FilterPanel } from './components'
import { useStore } from './store'
import { FilterOption } from './types'
import {
  getCodsetValue,
  getNormalizedAppointmentType,
  getNormalizedProviderType,
  getValidStartDate,
} from './utils'

interface ScheduleAppointmentListClientProps {
  mapKey: string
  stripeKey: string
  isSchedulingOptimizationEnabled?: boolean
}

const ScheduleAppointmentListClient = ({
  mapKey,
  stripeKey,
  isSchedulingOptimizationEnabled,
}: ScheduleAppointmentListClientProps) => {
  const [hasHydrated, setHasHydrated] = useState(false)
  const stateCodes = useCodesetCodes(CODESETS.UsStates)
  const ref = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  usePublishLoaded(SCHEDULE_APPOINTMENT_LIST)
  usePublishSize(SCHEDULE_APPOINTMENT_LIST, ref)
  useSubscribeClosePopover(SCHEDULE_APPOINTMENT_LIST)

  const searchParams = useSearchParams()
  const mid = searchParams.get('mid') ?? ''

  if (typeof window !== 'undefined') {
    localStorage.setItem('mid', mid)
  }

  const {
    filters,
    handleFiltersChange,
    setCurrentWeekReel,
    searchLocationsProvidersAction,
    loading,
    setProviderIds,
  } = useStore(
    useShallow((snapshot) => ({
      filters: snapshot.filters,
      handleFiltersChange: snapshot.handleFiltersChange,
      setCurrentWeekReel: snapshot.setCurrentWeekReel,
      searchLocationsProvidersAction: snapshot.searchLocationsProviders,
      loading: snapshot.loading,
      setProviderIds: snapshot.setProviderIds,
    })),
  )

  const [zipCodeState, setZipCodeState] = useState(filters.zipCode)

  const [stateOptions, setStateOptions] = useState<string[]>([])

  const [debouncedZipCode] = useDebounce(zipCodeState, 500)

  useEffect(() => {
    const hydrateAndInit = async () => {
      await Promise.resolve(useStore.persist.rehydrate())
      setHasHydrated(true)
    }

    hydrateAndInit()
  }, [])

  useEffect(() => {
    setCurrentWeekReel(0)
  }, [setCurrentWeekReel])

  useEffect(() => {
    setZipCodeState(filters.zipCode)
  }, [filters.zipCode])

  useEffect(() => {
    parent.postMessage(
      {
        event: enums.SCHEDULE_START,
        user_data: {
          date_of_birth: searchParams.get('dateOfBirth') ?? '',
          city: searchParams.get('primaryCity') ?? '',
          state: searchParams.get('state') ?? '',
          zip_code: searchParams.get('zipCode') ?? '',
        },
      },
      PSYCHPLUS_LIVE_URL,
    )
  }, [])

  useEffect(() => {
    handleFiltersChange({
      providerType: searchParams.get('providerType') ?? '',
      appointmentType: searchParams.get('appointmentType') ?? '',
      zipCode: searchParams.get('zipCode') ?? '',
      state: searchParams.get('state') ?? '',
      sortBy: SORT_TYPES.BEST_OPTION,
      language: 'English',
      startingDate: isMobile()
        ? formatDateYmd(new Date())
        : getStartOfWeek(new Date()),
    })
  }, [handleFiltersChange, searchParams])

  useDeepCompareEffect(() => {
    if (!hasHydrated || filters.zipCode.length < 5 || !filters.state) {
      return
    }
    const { zipCode, appointmentType, state, startingDate, providerType } =
      filters
    searchLocationsProvidersAction(
      {
        zipCode,
        appointmentType: getNormalizedAppointmentType(appointmentType),
        state,
        startingDate: isMobile()
          ? getValidStartDate(startingDate)
          : startingDate,
        providerType: getNormalizedProviderType(providerType),
        stateCode: getCodsetValue(stateCodes, filters.state),
      },
      toast,
    )

    const maxDaysOutToLook = 6
    const includeDistance = filters.appointmentType === VISIT_TYPES.IN_PERSON

    // Pre fetch provider list and sort it to use for sort by filter options (Next available)
    getAppointmentAvailabilityForUnauthenticatedUser(
      {
        postalCode: filters.zipCode,
        type:
          filters.appointmentType === VISIT_TYPES.IN_PERSON
            ? AppointmentType.InPerson
            : AppointmentType.Virtual,
        specialistTypeCode:
          filters.providerType === SERVICE_TYPES.PSYCHIATRY
            ? ProviderType.Psychiatrist
            : ProviderType.Therapist,
        startingDate: filters.startingDate,
        maxDaysOutToLook,

        state: filters.state,
        patientDateOfBirth: format(new Date('1970-01-01'), 'yyyy-MM-dd'),
      },
      includeDistance,
    ).then((data) => {
      const sortedSpecialistIds = data.staffAppointmentAvailabilities
        .sort((a, b) => {
          // find earliest slot for specialist a
          const earliestA = Math.min(
            ...a.availableSlots.map((slot) =>
              new Date(slot.startDate).getTime(),
            ),
          )

          // find earliest slot for specialist b
          const earliestB = Math.min(
            ...b.availableSlots.map((slot) =>
              new Date(slot.startDate).getTime(),
            ),
          )

          return earliestA - earliestB
        })
        .map((item) => item.specialist.id)

      const uniqueSpecialistIds: number[] = []
      const seen = new Set<number>()

      for (const id of sortedSpecialistIds) {
        if (!seen.has(id)) {
          seen.add(id)
          uniqueSpecialistIds.push(id)
        }
      }

      setProviderIds(uniqueSpecialistIds)
    })
  }, [
    filters.state,
    filters.providerType,
    filters.appointmentType,
    filters.startingDate,
    hasHydrated,
  ])

  useEffect(() => {
    const fetchZipcodeInfo = async (zipCode: string) => {
      filters.state = ''
      const response = await getZipcodeInfo(zipCode, mapKey)
      const states = response.data
      const options: string[] = states.reduce((acc: string[], state) => {
        acc.push(state.long_name)

        return acc
      }, [])

      setStateOptions(options)

      if (options.length) {
        filters.state = options[0]
      }
    }

    if (debouncedZipCode && debouncedZipCode.length === 5) {
      fetchZipcodeInfo(debouncedZipCode)
    }
  }, [debouncedZipCode])

  if (loading) {
    return (
      <Flex direction="column" className="w-full" ref={ref}>
        <Flex
          className="w-full border border-gray-3"
          py="5"
          px="7"
          align="center"
        >
          <LoadingPlaceholder />
        </Flex>
      </Flex>
    )
  }

  const stateOptionMapping: FilterOption[] = stateOptions.map((state) => ({
    label: state,
    value: state,
  }))

  return (
    <Flex direction="column" className="w-full" ref={ref}>
      <FilterPanel
        stateOptions={stateOptionMapping}
        isSchedulingOptimizationEnabled={isSchedulingOptimizationEnabled}
      />
      <AvailabilityList
        isSchedulingOptimizationEnabled={isSchedulingOptimizationEnabled}
        mapKey={mapKey}
        stripeKey={stripeKey}
      />
    </Flex>
  )
}
export { ScheduleAppointmentListClient }
