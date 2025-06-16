'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CODESETS } from '@psychplus-v2/constants'
import { Flex } from '@radix-ui/themes'
import { useDebounce } from 'use-debounce'
import { useShallow } from 'zustand/react/shallow'
import { isMobile } from '@psychplus/utils/client'
import { getZipcodeInfo } from '@psychplus/utils/map'
import { formatDateYmd, getFirstDayOfWeek } from '@psychplus/utils/time'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeClosePopover,
} from '@psychplus/widgets/hooks'
import { LoadingPlaceholder } from '@/features/appointments/search/ui/search-appointments-view/loading-placeholder.tsx'
import { useDeepCompareEffect } from '@/hooks'
import { useCodesetCodes, useToast } from '@/providers'
import { AvailabilityList, FilterPanel } from './components'
import { useStore } from './store'
import {
  getCodsetValue,
  getNormalizedAppointmentType,
  getNormalizedProviderType,
  getValidStartDate,
} from './utils'

interface ScheduleAppointmentListClientProps {
  mapKey: string
}

const ScheduleAppointmentListClient = ({
  mapKey,
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
  } = useStore(
    useShallow((snapshot) => ({
      filters: snapshot.filters,
      handleFiltersChange: snapshot.handleFiltersChange,
      setCurrentWeekReel: snapshot.setCurrentWeekReel,
      searchLocationsProvidersAction: snapshot.searchLocationsProviders,
      loading: snapshot.loading,
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
    handleFiltersChange({
      providerType: searchParams.get('providerType') ?? '',
      appointmentType: searchParams.get('appointmentType') ?? '',
      zipCode: searchParams.get('zipCode') ?? '',
      state: searchParams.get('state') ?? '',
      sortBy: '',
      language: '',
      maxDistanceInMiles: undefined,
      startingDate: formatDateYmd(
        isMobile() ? new Date() : getFirstDayOfWeek(),
      ),
    })
  }, [handleFiltersChange, searchParams])

  useDeepCompareEffect(() => {
    if (!hasHydrated || filters.zipCode.length < 5 || !filters.state) {
      return
    }
    const {
      zipCode,
      appointmentType,
      state,
      startingDate,
      maxDistanceInMiles,
      providerType,
    } = filters
    searchLocationsProvidersAction(
      {
        zipCode,
        appointmentType: getNormalizedAppointmentType(appointmentType),
        state,
        startingDate: getValidStartDate(startingDate),
        maxDistanceInMiles,
        providerType: getNormalizedProviderType(providerType),
        stateCode: getCodsetValue(stateCodes, filters.state),
      },
      toast,
    )
  }, [
    filters.state,
    filters.providerType,
    filters.appointmentType,
    filters.startingDate,
    filters.maxDistanceInMiles,
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

  return (
    <Flex direction="column" className="w-full" ref={ref}>
      <FilterPanel stateOptions={stateOptions} />
      <AvailabilityList />
    </Flex>
  )
}
export { ScheduleAppointmentListClient }
