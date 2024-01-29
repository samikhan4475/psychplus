'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { useDebounce } from 'use-debounce'
import { StaffAppointmentAvailabilities } from '@psychplus/appointments'
import { getAppointmentAvailabilityForUnauthenticatedUser } from '@psychplus/appointments/api.client'
import { getCodeSets } from '@psychplus/codeset/api.client'
import { formatDateYmd } from '@psychplus/utils/time'
import {
  FilterPanel,
  ProviderWithClinicAndWeeklyAvailability,
  WeekCalendarRow,
} from '@/widgets/schedule-appointment-list/components'
import { useStore } from '@/widgets/schedule-appointment-list/store'
import type { StaffWithClinicsAndSlots } from '@/widgets/schedule-appointment-list/types'
import {
  applyFilters,
  groupStaffWithClinicsAndSlots,
} from '@/widgets/schedule-appointment-list/utils'

const ScheduleAppointmentPage = () => {
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
  }, [])

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
  }, [staffAppointmentAvailabilities, filters.sortBy, filters.language])

  useEffect(() => {
    setStaffWithAvailableSlots(
      groupStaffWithClinicsAndSlots(filteredStaffAppointmentAvailabilities),
    )
  }, [filteredStaffAppointmentAvailabilities])

  useEffect(() => {
    setStaffWithClinicsAndSlotsState(staffWithClinicsAndSlots)
  }, [staffWithClinicsAndSlots])

  return (
    <Flex direction="column" className="w-full">
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

export default ScheduleAppointmentPage
