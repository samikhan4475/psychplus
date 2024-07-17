import { useEffect, useMemo, useState } from 'react'
import NextLink from 'next/link'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { GlobeIcon } from '@psychplus-v2/components'
import { AppointmentType } from '@psychplus-v2/constants'
import { Consent } from '@psychplus-v2/types'
import {
  getCalendarDate,
  getCalendarDateLabel,
  getProviderTypeLabel,
  getTimeLabel,
  getUserFullName,
} from '@psychplus-v2/utils'
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { DistanceIcon, ProviderAvatar } from '@/components-v2'
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
import { ClinicSelector } from './clinic-selector'

interface AvailabilityListProps {
  userConsents: Consent[]
}

interface PrimaryProviderAvailabilityCardProps {
  userConsents: Consent[]
}

const PrimaryProviderAvailabilityCard = ({
  userConsents,
}: PrimaryProviderAvailabilityCardProps) => {
  const data = useSortedFilteredData()

  const careTeamMember = useStore((state) => state.careTeamMember())

  const primaryProviderAvailabilityData = data.find(
    (d) => d.specialist.id === careTeamMember?.staffDetails.id,
  )

  if (!primaryProviderAvailabilityData) {
    return (
      <Flex pt="8" justify="center" className="bg-white">
        <Text className="text-[18px] text-gray-11">No results</Text>
      </Flex>
    )
  }

  return (
    <ProviderAvailabilityCard
      userConsents={userConsents}
      data={primaryProviderAvailabilityData}
    />
  )
}

const AvailabilityList = ({ userConsents }: AvailabilityListProps) => {
  const data = useSortedFilteredData()

  const careTeamMember = useStore((state) => state.careTeamMember())

  if (data.length === 0) {
    return (
      <Flex pt="8" justify="center" className="bg-white flex-1">
        <Text className="text-[18px] text-gray-11">No results</Text>
      </Flex>
    )
  }

  return data.map((availability) => {
    if (availability.specialist.id !== careTeamMember?.staffDetails.id)
      return (
        <ProviderAvailabilityCard
          userConsents={userConsents}
          key={availability.specialist.id}
          data={availability}
        />
      )
  })
}

const ProviderAvailabilityCard = ({
  data,
  userConsents,
}: {
  userConsents: Consent[]
  data: AppointmentAvailability
}) => {
  const [selectedClinic, setSelectedClinic] = useState(0)
  const [showMore, setShowMore] = useState(false)

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

  const checkHasMoreSlots = () => {
    const allSlotsByDay = Object.entries(
      data.clinics[selectedClinic].slotsByDay,
    )
    return allSlotsByDay.some(([, value]) => value && value.length > 3)
  }

  return (
    <Flex px="5" py="5" className="bg-white border-b border-b-gray-5">
      <Flex direction="column" gap="5" className="mr-[48px] w-[240px]">
        <Flex gap="4">
          <ProviderAvatar provider={data.specialist} size="5" />
          <Flex direction="column" justify="center">
            <Text weight="bold" className="text-[20px] text-accent-12">
              {`${getUserFullName(data.specialist.legalName)} ${
                data.specialist.legalName.honors ?? ''
              }`}
            </Text>
            <Flex gap="1">
              <Text
                weight="medium"
                className="text-pp-gray-1 text-[12px] uppercase"
              >
                {getProviderTypeLabel(data.specialistTypeCode)}
              </Text>
              <Flex align="center">
                {Array.from({ length: 5 }, (_, index) => index + 1).map(
                  (value) => (
                    <Box key={value}>
                      {value <= (data.specialist.rating ?? 0) ? (
                        <StarFilledIcon
                          height={16}
                          width={16}
                          color="#FFC700"
                        />
                      ) : (
                        <StarIcon height={16} width={16} color="#FFC700" />
                      )}
                    </Box>
                  ),
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column">
          {appointmentType === AppointmentType.InPerson ? (
            <ClinicSelector
              clinics={data.clinics}
              selectedClinic={selectedClinic}
              onChange={setSelectedClinic}
            />
          ) : null}
          <Flex gap="2" justify="between">
            {renderSpokenLanguages(data)}
            {renderDistance(data.clinics[selectedClinic])}
          </Flex>
        </Flex>
      </Flex>
      <Flex className="flex-1 px-[40px] pt-2">
        <Flex direction="column" gap="4" className="w-full">
          <Flex>
            {dateRange.map((date, i) => (
              <Box key={`${i}-${date.toString()}`} className="flex-1">
                <Flex direction="column" align="center" gap="4">
                  {appointmentType === AppointmentType.Virtual ? (
                    <AppointmentTimeSlots
                      showMore={showMore}
                      userConsents={userConsents}
                      clinic={data.clinics[selectedClinic]}
                      specialist={data.specialist}
                      slots={data.allSlotsByDay[getCalendarDateLabel(date)]}
                    />
                  ) : (
                    <AppointmentTimeSlots
                      showMore={showMore}
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
          {checkHasMoreSlots() ? (
            <Button
              onClick={() => setShowMore((prevState) => !prevState)}
              size="3"
              className="bg-pp-blue-1 text-accent-12"
            >
              {showMore ? 'See less' : 'See more'}
            </Button>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  )
}

const AppointmentTimeSlots = ({
  slots,
  userConsents,
  showMore,
  ...rest
}: {
  userConsents: Consent[]
  slots?: AppointmentSlot[]
  specialist: AppointmentSpecialist
  showMore: boolean
  clinic: AppointmentClinic
}) => {
  const { appointmentType, providerType } = useStore((state) => ({
    appointmentType: state.appointmentType,
    providerType: state.providerType,
  }))

  if (!slots || slots.length === 0) {
    return null
  }

  const endIndex = showMore ? slots.length : 3

  const getRedirectToPaymentMethodUrl = (slot: AppointmentSlot) => {
    const queryParams = {
      appointmentType: JSON.stringify(appointmentType).toString(),
      providerType: JSON.stringify(providerType).toString(),
      slot: JSON.stringify(slot).toString(),
      specialist: JSON.stringify(rest.specialist).toString(),
      clinic: JSON.stringify({
        id: rest.clinic.id,
        name: rest.clinic.name,
        isTest: rest.clinic.isTest,
        contact: rest.clinic.contact,
        distanceInMiles: rest.clinic.distanceInMiles,
      }).toString(),
    }

    const queryString = new URLSearchParams(queryParams).toString()

    return `book?${queryString}`
  }

  return (
    <>
      {slots.slice(0, endIndex).map((slot: AppointmentSlot) => (
        <NextLink
          href={getRedirectToPaymentMethodUrl(slot)}
          key={`${slot.startDate}:${slot.duration}`}
        >
          <Button
            variant="outline"
            highContrast
            style={{ boxShadow: 'none' }}
            className="hover:text-white whitespace-nowrap text-[16px] text-[#24366B] outline outline-1 outline-[#b9bbc6] hover:bg-accent-12 hover:outline-accent-12"
          >
            {getTimeLabel(slot.startDate)}
          </Button>
        </NextLink>
      ))}
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
      <DistanceIcon />
      <Text className="text-[12.5px] font-[300]">
        {Math.round(clinic.distanceInMiles * 10) / 10} mi
      </Text>
    </Flex>
  )
}

export { AvailabilityList, PrimaryProviderAvailabilityCard }
