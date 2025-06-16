'use client'

import { useMemo } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useShallow } from 'zustand/react/shallow'
import { isMobile } from '@psychplus/utils/client'
import { useStore } from '../../store'
import { sortAndFilterAppointments } from '../../utils'
import { ProviderWithClinicAndWeeklyAvailability } from '../provider-with-clinic-and-weekly-availability'
import { WeekCalendarRow } from '../week-calender-row'

const AvailabilityList = () => {
  const { data, filters } = useStore(
    useShallow((state) => ({
      data: state.data,
      filters: state.filters,
    })),
  )

  const sortedProviders = useMemo(
    () =>
      sortAndFilterAppointments(data ?? [], {
        sortBy: filters.sortBy,
        language: filters.language,
      }),
    [data, filters.sortBy, filters.language],
  )

  return (
    <>
      <Flex
        className="w-full border border-gray-3 flex-1"
        py="5"
        px="7"
        align="center"
      >
        <Flex align="center" className="justify-between md:justify-center">
          <Flex className=" w-[380px] text-[#151B4A]">
            <Text className="sm-text-2 text-3 md:text-5">
              {sortedProviders?.length} Providers
            </Text>
          </Flex>
          <Flex>
            <WeekCalendarRow />
          </Flex>
        </Flex>
      </Flex>

      <Flex>
        <Flex className="max-h-full overflow-y-auto" direction="column" pb="7">
          {sortedProviders?.map((staffWithClinicsAndSlots) => (
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
    </>
  )
}
export { AvailabilityList }
