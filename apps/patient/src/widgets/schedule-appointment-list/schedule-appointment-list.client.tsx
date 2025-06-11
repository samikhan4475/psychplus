'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { isBefore } from 'date-fns'
import { useDebounce } from 'use-debounce'
import { StaffAppointmentAvailabilities } from '@psychplus/appointments'
import { getAppointmentAvailabilityForUnauthenticatedUser } from '@psychplus/appointments/api.client'
import { getCodeSets } from '@psychplus/codeset/api.client'
import { isMobile } from '@psychplus/utils/client'
import { getZipcodeInfo } from '@psychplus/utils/map'
import {
  formatDateYmd,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  parseDateString,
} from '@psychplus/utils/time'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeClosePopover,
} from '@psychplus/widgets/hooks'
import { LoadingPlaceholder } from '@/features/appointments/search/ui/search-appointments-view/loading-placeholder.tsx'
import {
  FilterPanel,
  ProviderWithClinicAndWeeklyAvailability,
  WeekCalendarRow,
} from './components'
import { useStore } from './store'
import type { StaffWithClinicsAndSlots } from './types'
import {
  applyFilters,
  convertUtcToLocalTimeInSlots,
  groupStaffWithClinicsAndSlots,
} from './utils'

interface ScheduleAppointmentListClientProps {
  mapKey: string
}

const ScheduleAppointmentListClient = ({
  mapKey,
}: ScheduleAppointmentListClientProps) => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(SCHEDULE_APPOINTMENT_LIST)
  usePublishSize(SCHEDULE_APPOINTMENT_LIST, ref)
  useSubscribeClosePopover(SCHEDULE_APPOINTMENT_LIST)
  
  const searchParams = useSearchParams()
  const mid = searchParams.get('mid') ?? "";

  if (typeof window !== "undefined") {
    localStorage.setItem("mid", mid);
  }

  const {
    filters,
    staffWithClinicsAndSlots,
    filteredStaffAppointmentAvailabilities,
    setCodeSets,
    setStaffWithAvailableSlots,
    setFilteredStaffAppointmentAvailabilities,
    handleFiltersChange,
    setCurrentWeekReel,
  } = useStore()

  const [staffWithClinicsAndSlotsState, setStaffWithClinicsAndSlotsState] =
    useState<StaffWithClinicsAndSlots[] | []>([])

  const [staffAppointmentAvailabilities, setStaffAppointmentAvailabilities] =
    useState<StaffAppointmentAvailabilities | []>([])

  const [zipCodeState, setZipCodeState] = useState(filters.zipCode)

  const [stateOptions, setStateOptions] = useState<string[]>([])

  const [debouncedZipCode] = useDebounce(zipCodeState, 500)

  const staffIdParam = parseInt(searchParams.get('staffId') ?? '')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setCurrentWeekReel(0)
  }, [setCurrentWeekReel])

  useEffect(() => {
    setZipCodeState(filters.zipCode)
  }, [filters.zipCode])

  useEffect(() => {
    getCodeSets().then(setCodeSets)
    handleFiltersChange({
      providerType: searchParams.get('providerType') ?? '',
      appointmentType: searchParams.get('appointmentType') ?? '',
      zipCode: searchParams.get('zipCode') ?? '',
      state: searchParams.get('state') ?? '',
      sortBy: '',
      language: '',
      startingDate: formatDateYmd(isMobile() ? new Date() : getFirstDayOfWeek()),
    })
  }, [handleFiltersChange, searchParams, setCodeSets])

  useEffect(() => {
    if (filters.zipCode.length < 5 || !filters.state) {
      return
    }

    setIsLoading(true)
    const today = new Date()
    const startDate = parseDateString(filters.startingDate)
    const todayDate = parseDateString(formatDateYmd(today))
    const isStartBeforeToday = isBefore(new Date(filters.startingDate), today)

    const referenceDay = isStartBeforeToday
      ? todayDate.getDay()
      : startDate.getDay()

    const maxDaysOutToLook = !isMobile()
      ? getLastDayOfWeek(startDate).getDay() + 1 - referenceDay
      : 1


    getAppointmentAvailabilityForUnauthenticatedUser(
      {
        postalCode: filters.zipCode,
        type:
          filters.appointmentType === 'In-Person' ? 'InPerson' : 'TeleVisit',
        specialistTypeCode: filters.providerType === 'Psychiatry' ? 1 : 2,
        startingDate: isBefore(new Date(filters.startingDate), today)
          ? today.toISOString().split('T')[0]
          : new Date(filters.startingDate).toISOString().split('T')[0],
        maxDaysOutToLook,
        staffIds: staffIdParam ? [staffIdParam] : [],
        state: filters.state,
        patientDateOfBirth: searchParams.get('dateOfBirth') || '',
      },
      filters.appointmentType === 'In-Person',
    ).then((data) => {
      data = convertUtcToLocalTimeInSlots(data)
      setStaffAppointmentAvailabilities(data)
      setIsLoading(false)
    })
  }, [
    filters.state,
    filters.providerType,
    filters.appointmentType,
    filters.startingDate,
  ])

  useEffect(() => {
    setFilteredStaffAppointmentAvailabilities(
      applyFilters(
        filters.language,
        filters.sortBy.replace(/\s/g, ''),
        staffAppointmentAvailabilities,
      ),
    )
  }, [
    staffAppointmentAvailabilities,
    filters.sortBy,
    filters.language,
    setFilteredStaffAppointmentAvailabilities,
  ])

  useEffect(() => {
    setStaffWithAvailableSlots(
      groupStaffWithClinicsAndSlots(filteredStaffAppointmentAvailabilities),
    )
  }, [filteredStaffAppointmentAvailabilities, setStaffWithAvailableSlots])

  useEffect(() => {
    setStaffWithClinicsAndSlotsState(staffWithClinicsAndSlots)
  }, [staffWithClinicsAndSlots])

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

  if (isLoading) {
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
        <Flex
          className="w-full border border-gray-3"
          py="5"
          px="7"
          align="center"
        >
          <Flex align="center" className='justify-between md:justify-center'>
            <Flex className="w-[100px] text-[#151B4A] md:w-[380px]">
              <Text className='text-3 md:text-5'>
                {staffWithClinicsAndSlotsState?.length} Providers
              </Text>
            </Flex>
            <Flex>
              <WeekCalendarRow />
            </Flex>
          </Flex>
        </Flex>

        <Flex className="w-full">
          <Flex
            className="max-h-full overflow-y-auto"
            direction="column"
            pb="7"
            style={{ flex: 1 }}
          >
            {staffWithClinicsAndSlotsState?.map((staffWithClinicsAndSlots) => (
              <Flex
                py="5"
                px="7"
                className="h-auto w-full border-b border-b-gray-3"
                key={staffWithClinicsAndSlots.staff.id}
              >
                <ProviderWithClinicAndWeeklyAvailability
                  staffWithClinicsAndSlots={staffWithClinicsAndSlots}
                />
              </Flex>
            ))}
          </Flex>

          {!isMobile() && (
            <Flex
              justify="end"
              style={{
                flex: filters.appointmentType === 'In-Person' ? 0.28 : 0,
              }}
            >
              {/*{filters.appointmentType === 'In-Person' && (*/}
              {/*  <LocationMap*/}
              {/*    width={350}*/}
              {/*    height={640}*/}
              {/*    zoom={17}*/}
              {/*    locations={extractLocations(*/}
              {/*      filteredStaffAppointmentAvailabilities,*/}
              {/*    )}*/}
              {/*  />*/}
              {/*)}*/}
            </Flex>
          )}
        </Flex>
      </Flex>
  )
}

export { ScheduleAppointmentListClient }
