'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { useDebounce } from 'use-debounce'
import { StaffAppointmentAvailabilities } from '@psychplus/appointments'
import { getAppointmentAvailabilityForUnauthenticatedUser } from '@psychplus/appointments/api.client'
import { getCodeSets } from '@psychplus/codeset/api.client'
import { Popover } from '@psychplus/ui/popover'
import { formatDateYmd } from '@psychplus/utils/time'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeClosePopover,
} from '@psychplus/widgets/hooks'
import {
  FilterPanel,
  ProviderWithClinicAndWeeklyAvailability,
  WeekCalendarRow,
} from './components'
import { useStore } from './store'
import type { StaffWithClinicsAndSlots } from './types'
import { applyFilters, groupStaffWithClinicsAndSlots } from './utils'

const ScheduleAppointmentListClient = () => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(SCHEDULE_APPOINTMENT_LIST)
  usePublishSize(SCHEDULE_APPOINTMENT_LIST, ref)
  useSubscribeClosePopover(SCHEDULE_APPOINTMENT_LIST)

  const searchParams = useSearchParams()

  const {
    filters,
    staffWithClinicsAndSlots,
    filteredStaffAppointmentAvailabilities,
    setCodeSets,
    setStaffWithAvailableSlots,
    setFilteredStaffAppointmentAvailabilities,
    handleFiltersChange,
  } = useStore()

  const [staffWithClinicsAndSlotsState, setStaffWithClinicsAndSlotsState] =
    useState<StaffWithClinicsAndSlots[] | []>([])

  const [staffAppointmentAvailabilities, setStaffAppointmentAvailabilities] =
    useState<StaffAppointmentAvailabilities | []>([])

  const [zipCodeState, setZipCodeState] = useState(filters.zipCode)

  const [debouncedZipCode] = useDebounce(zipCodeState, 500)

  useEffect(() => {
    setZipCodeState(filters.zipCode)
  }, [filters.zipCode])

  useEffect(() => {
    getCodeSets().then(setCodeSets)
    handleFiltersChange({
      providerType: searchParams.get('providerType') || '',
      appointmentType: searchParams.get('appointmentType') || '',
      zipCode: searchParams.get('zipCode') || '',
      sortBy: '',
      language: '',
      startingDate: formatDateYmd(new Date()),
    })
  }, [handleFiltersChange, searchParams, setCodeSets])

  useEffect(() => {
    getAppointmentAvailabilityForUnauthenticatedUser({
      postalCode: filters.zipCode,
      type: filters.appointmentType === 'In-Person' ? 'InPerson' : 'TeleVisit',
      specialistTypeCode: filters.providerType === 'Psychiatrist' ? 1 : 2,
      startingDate: filters.startingDate,
      maxDaysOutToLook: 6,
    }).then(setStaffAppointmentAvailabilities)
  }, [
    debouncedZipCode,
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

  return (
    <Flex direction="column" className="w-full" ref={ref}>
      <FilterPanel />
      <Flex
        className="w-full border border-gray-3"
        py="5"
        px="7"
        align="center"
      >
        <Flex style={{ flex: 1 }}>
          <Flex className="text-[#151B4A]" style={{ flex: 1 }}>
            <Text size="5">
              {staffWithClinicsAndSlotsState?.length} Providers
            </Text>
          </Flex>
          <Flex style={{ flex: 2.3 }}>
            <WeekCalendarRow />
          </Flex>
        </Flex>
        <Flex
          style={{
            flex: filters.appointmentType === 'In-Person' ? 0.28 : 0,
          }}
        ></Flex>
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
      </Flex>
    </Flex>
  )
}

export { ScheduleAppointmentListClient }
