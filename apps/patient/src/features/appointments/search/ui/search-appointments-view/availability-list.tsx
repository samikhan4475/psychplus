import { useEffect, useMemo, useState } from 'react'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { GlobeIcon } from '@psychplus-v2/components'
import { AppointmentType } from '@psychplus-v2/constants'
import { Consent } from '@psychplus-v2/types'
import {
  getCalendarDate,
  getCalendarDateLabel,
  getProviderTypeLabel,
  getUserFullName,
} from '@psychplus-v2/utils'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { NavigationIcon } from 'lucide-react'
import { ProviderAvatar } from '@/components-v2'
import { useStore } from '@/features/appointments/search/store'
import type {
  AppointmentAvailability,
  AppointmentClinic,
  AppointmentSlot,
  AppointmentSpecialist,
} from '@/features/appointments/search/types'
import { AppointmentSortBy } from '../../constants'
import { useSortedFilteredData } from '../../store/hooks'
import { generateDateRange, getEarliestSlot } from '../../utils'
import { BookSlotButton } from '../book-slot-button'
import { ClinicSelector } from './clinic-selector'

interface AvailabilityListProps {
  userConsents: Consent[]
}

const AvailabilityList = ({ userConsents }: AvailabilityListProps) => {
  const data = useSortedFilteredData()

  if (data.length === 0) {
    return (
      <Flex pt="8" justify="center" className="bg-white flex-1">
        <Text className="text-[18px] text-gray-11">No results</Text>
      </Flex>
    )
  }

  return data.map((availability) => (
    <ProviderAvailabilityCard
      userConsents={userConsents}
      key={availability.specialist.id}
      data={availability}
    />
  ))
}

const ProviderAvailabilityCard = ({
  data,
  userConsents,
}: {
  userConsents: Consent[]
  data: AppointmentAvailability
}) => {
  const [selectedClinic, setSelectedClinic] = useState(0)

  const { appointmentType, startingDate, sortBy } = useStore((state) => ({
    appointmentType: state.appointmentType,
    startingDate: state.startingDate,
    sortBy: state.sortBy,
  }))

  const dateRange = useMemo(
    () => generateDateRange(getCalendarDate(startingDate)),
    [startingDate],
  )

  useEffect(() => {
    if (!sortBy || sortBy === AppointmentSortBy.Nearest) {
      setSelectedClinic(0)
      return
    }

    let minIndex = 0
    let minSlot: AppointmentSlot | null = null

    for (let i = 0; i < data.clinics.length; ++i) {
      const earliestSlot = getEarliestSlot(
        data.clinics[i].slotsByDay,
        dateRange,
      )

      if (!earliestSlot) {
        continue
      }
      if (!minSlot) {
        minSlot = earliestSlot
        minIndex = i
      }

      const result = parseAbsoluteToLocal(earliestSlot.startDate).compare(
        parseAbsoluteToLocal(minSlot.startDate),
      )

      if (result < 0) {
        minSlot = earliestSlot
        minIndex = i
      }
    }

    setSelectedClinic(minIndex)
  }, [sortBy, data, dateRange])

  return (
    <Flex px="5" py="5" className="bg-white border-b border-b-gray-5">
      <Flex gap="5" className="w-[325px]">
        <ProviderAvatar provider={data.specialist} size="7" />
        <Flex direction="column" gap="2">
          <Flex direction="column">
            <Text weight="bold" className="text-[18px] text-accent-12">
              {`${getUserFullName(data.specialist.legalName)} ${
                data.specialist.legalName.honors ?? ''
              }`}
            </Text>
            <Text weight="medium" className="text-[12px] text-accent-11">
              {getProviderTypeLabel(data.specialistTypeCode)}
            </Text>
          </Flex>
          {appointmentType === AppointmentType.InPerson ? (
            <ClinicSelector
              clinics={data.clinics}
              selectedClinic={selectedClinic}
              onChange={setSelectedClinic}
            />
          ) : null}
          {renderSpokenLanguages(data)}
          {renderDistance(data.clinics[selectedClinic])}
        </Flex>
      </Flex>
      <Flex className="flex-1 px-[40px]">
        {dateRange.map((date, i) => (
          <Box key={`${i}-${date.toString()}`} className="flex-1">
            <Flex direction="column" align="center" gap="2">
              {appointmentType === AppointmentType.Virtual ? (
                <AppointmentTimeSlots
                  userConsents={userConsents}
                  clinic={data.clinics[selectedClinic]}
                  specialist={data.specialist}
                  slots={data.allSlotsByDay[getCalendarDateLabel(date)]}
                />
              ) : (
                <AppointmentTimeSlots
                  userConsents={userConsents}
                  clinic={data.clinics[selectedClinic]}
                  specialist={data.specialist}
                  slots={
                    data.clinics[selectedClinic].slotsByDay[
                      getCalendarDateLabel(date)
                    ]
                  }
                />
              )}
            </Flex>
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}

const AppointmentTimeSlots = ({
  slots,
  userConsents,
  ...rest
}: {
  userConsents: Consent[]
  slots?: AppointmentSlot[]
  specialist: AppointmentSpecialist
  clinic: AppointmentClinic
}) => {
  const [showMore, setShowMore] = useState(false)

  if (!slots || slots.length === 0) {
    return null
  }

  const endIndex = showMore ? slots.length : 3

  return (
    <>
      {slots.slice(0, endIndex).map((slot) => (
        <BookSlotButton
          userConsents={userConsents}
          key={`${slot.startDate}:${slot.duration}`}
          slot={slot}
          {...rest}
        />
      ))}
      {!showMore && slots.length > 3 ? (
        <Button
          variant="outline"
          highContrast
          onClick={() => {
            setShowMore(true)
          }}
          className="hover:text-white h-[40px] w-[85px] rounded-2 text-[13px] hover:bg-accent-12"
        >
          More
        </Button>
      ) : null}
      {showMore ? (
        <Button
          variant="outline"
          highContrast
          onClick={() => {
            setShowMore(false)
          }}
          className="hover:text-white h-[40px] w-[85px] rounded-2 text-[13px] hover:bg-accent-12"
        >
          Less
        </Button>
      ) : null}
    </>
  )
}

const renderSpokenLanguages = (data: AppointmentAvailability) => {
  const spokenLanguages = data.specialist.spokenLanguages

  if (!spokenLanguages || spokenLanguages.length === 0) {
    return null
  }

  return (
    <Flex gap="2">
      <Box>
        <GlobeIcon />
      </Box>
      <Text className="text-[12px] font-[300]">
        {spokenLanguages.join(', ')}
      </Text>
    </Flex>
  )
}

const renderDistance = (clinic: AppointmentClinic) => {
  if (clinic.distanceInMiles === undefined) {
    return null
  }

  return (
    <Flex align="center" gap="2">
      <NavigationIcon
        width={19}
        height={19}
        strokeWidth={1.25}
        className="text-accent-12"
      />
      <Text className="text-[12.5px] font-[300]">
        {Math.round(clinic.distanceInMiles * 10) / 10} mi
      </Text>
    </Flex>
  )
}

export { AvailabilityList }
