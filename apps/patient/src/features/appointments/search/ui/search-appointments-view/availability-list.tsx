import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppointmentType } from '@psychplus-v2/constants'
import { Clinic, Consent } from '@psychplus-v2/types'
import {
  getCalendarDate,
  getCalendarDateLabel,
  getTimeLabel,
} from '@psychplus-v2/utils'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureEmpty } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { useStore } from '@/features/appointments/search/store'
import type {
  AppointmentAvailability,
  AppointmentClinic,
  AppointmentSlot,
  AppointmentSpecialist,
} from '@/features/appointments/search/types'
import { AppointmentSortBy } from '../../constants'
import { useSortedFilteredData } from '../../store/hooks'
import {
  generateDateRange,
  getEarliestSlot,
  getNextAvailableDateLabel,
  isDateInNextRange,
  parseDateAbsoluteToLocal,
} from '../../utils'
import { ProviderHeader } from './provider-header'
import { ProviderSlots } from './provider-slots'

interface DialogAction {
  isOpen: boolean
  clinic: Clinic
}

interface AvailabilityListProps {
  userConsents: Consent[]
  setShowDifferentStateDialog: (action: DialogAction) => void
  isSchedulingOptimizationEnabled?: boolean
}

interface PrimaryProviderAvailabilityCardProps {
  userConsents: Consent[]
  setShowDifferentStateDialog: (action: DialogAction) => void
  primaryProviderAvailabilityData: AppointmentAvailability
  isSchedulingOptimizationEnabled?: boolean
}

const PrimaryProviderAvailabilityCard = ({
  userConsents,
  setShowDifferentStateDialog,
  primaryProviderAvailabilityData,
  isSchedulingOptimizationEnabled,
}: PrimaryProviderAvailabilityCardProps) => {
  if (!primaryProviderAvailabilityData) {
    return (
      <Flex pt="8" justify="center" className="bg-white">
        <Text className="text-[18px] text-gray-11">No results</Text>
      </Flex>
    )
  }

  return (
    <>
      {isSchedulingOptimizationEnabled ? (
        <ProviderAvailabilityCard
          userConsents={userConsents}
          data={primaryProviderAvailabilityData}
          setShowDifferentStateDialog={setShowDifferentStateDialog}
        />
      ) : (
        <LegacyProviderAvailabilityCard
          userConsents={userConsents}
          data={primaryProviderAvailabilityData}
          setShowDifferentStateDialog={setShowDifferentStateDialog}
        />
      )}
    </>
  )
}

const AvailabilityList = ({
  userConsents,
  setShowDifferentStateDialog,
  isSchedulingOptimizationEnabled,
}: AvailabilityListProps) => {
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
        <>
          {isSchedulingOptimizationEnabled ? (
            <ProviderAvailabilityCard
              userConsents={userConsents}
              key={availability.specialist.id}
              data={availability}
              setShowDifferentStateDialog={setShowDifferentStateDialog}
            />
          ) : (
            <LegacyProviderAvailabilityCard
              userConsents={userConsents}
              key={availability.specialist.id}
              data={availability}
              setShowDifferentStateDialog={setShowDifferentStateDialog}
            />
          )}
        </>
      )
  })
}

const ProviderAvailabilityCard = ({
  data,
  userConsents,
  setShowDifferentStateDialog,
}: {
  userConsents: Consent[]
  data: AppointmentAvailability
  setShowDifferentStateDialog: (action: DialogAction) => void
}) => {
  const [selectedClinic, setSelectedClinic] = useState(0)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const { appointmentType } = useStore((state) => ({
    appointmentType: state.appointmentType,
  }))

  useEffect(() => {
    setSelectedClinic(0)
  }, [appointmentType])

  return (
    <Flex px="5" py="5" className="bg-white border-b border-b-gray-5">
      <ProviderHeader
        providerDetail={data}
        appointmentType={appointmentType}
        setSelectedClinic={setSelectedClinic}
        selectedClinic={selectedClinic}
      />

      <ProviderSlots
        data={data}
        userConsents={userConsents}
        setShowDifferentStateDialog={setShowDifferentStateDialog}
        selectedClinic={selectedClinic}
        onClinicChange={setSelectedClinic}
        setSlotsLoading={setSlotsLoading}
        slotsLoading={slotsLoading}
      />
    </Flex>
  )
}

const LegacyProviderAvailabilityCard = ({
  data,
  userConsents,
  setShowDifferentStateDialog,
}: {
  userConsents: Consent[]
  data: AppointmentAvailability
  setShowDifferentStateDialog: (action: DialogAction) => void
}) => {
  const [selectedClinic, setSelectedClinic] = useState(0)
  const [showMore, setShowMore] = useState(false)

  const { appointmentType, startingDate, sortBy, setStartingDate } = useStore(
    (state) => ({
      appointmentType: state.appointmentType,
      startingDate: state.startingDate,
      sortBy: state.sortBy,
      setStartingDate: state.setStartingDate,
    }),
  )
  const nextAvailableSlotDate = Object.keys(data.allSlotsByDay)[0]

  const dateIsInFuture = useMemo(
    () =>
      isDateInNextRange(
        getCalendarDate(startingDate),
        getCalendarDate(nextAvailableSlotDate),
      ),
    [startingDate, nextAvailableSlotDate],
  )

  const dateRange = useMemo(
    () => generateDateRange(getCalendarDate(startingDate)),
    [startingDate],
  )

  useEffect(() => {
    setSelectedClinic(0)
  }, [appointmentType])

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
      const result = parseDateAbsoluteToLocal(earliestSlot, minSlot)
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
      <ProviderHeader
        providerDetail={data}
        appointmentType={appointmentType}
        setSelectedClinic={setSelectedClinic}
        selectedClinic={selectedClinic}
      />
      <Flex className="flex-1 px-[40px] pt-2">
        <Flex direction="column" gap="4" className="w-full">
          {dateIsInFuture ? (
            <FeatureEmpty
              description={`Next available appointment on ${getNextAvailableDateLabel(
                getCalendarDate(nextAvailableSlotDate),
              )}`}
              action={
                <Flex justify="center">
                  <Button
                    size="3"
                    className="justify-center"
                    onClick={() =>
                      setStartingDate(
                        getCalendarDateLabel(
                          getCalendarDate(nextAvailableSlotDate),
                        ),
                      )
                    }
                    highContrast
                  >
                    Go to Appointment
                  </Button>
                </Flex>
              }
              Icon={EmptyFileIcon}
            />
          ) : (
            <>
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
                          providerType={data.providerType}
                          slots={data.allSlotsByDay[getCalendarDateLabel(date)]}
                          setShowDifferentStateDialog={
                            setShowDifferentStateDialog
                          }
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
                          providerType={data.providerType}
                          setShowDifferentStateDialog={
                            setShowDifferentStateDialog
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
              ) : (
                <Box className="h-10" />
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

const AppointmentTimeSlots = ({
  slots,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userConsents,
  showMore,
  setShowDifferentStateDialog,
  ...rest
}: {
  userConsents: Consent[]
  slots?: AppointmentSlot[]
  specialist: AppointmentSpecialist
  showMore: boolean
  clinic: AppointmentClinic
  providerType?: string | null
  setShowDifferentStateDialog: (action: DialogAction) => void
}) => {
  const { appointmentType, providerType, setCurrentBookingAppointmentData } =
    useStore((state) => ({
      appointmentType: state.appointmentType,
      providerType: state.providerType,
      setCurrentBookingAppointmentData: state.setCurrentBookingAppointmentData,
    }))

  const router = useRouter()

  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const searchParams = useSearchParams()

  if (!slots || slots.length === 0) {
    return null
  }

  const endIndex = showMore ? slots.length : 3

  const handleSlotClick = (slot: AppointmentSlot) => {
    const profileState = profile.contactDetails.addresses?.[0]?.state
    const clinicState = rest.clinic.contact.addresses?.[0]?.state
    const bookingData = {
      appointmentId: searchParams.get('appointmentId')?.toString(),
      appointmentType,
      providerType: providerType,
      newProviderType: rest.providerType || '',
      slot,
      specialist: rest.specialist,
      clinic: {
        id:
          appointmentType === AppointmentType.InPerson
            ? rest.clinic.id
            : slot.clinicId || '',
        name: rest.clinic.name,
        isTest: rest.clinic.isTest || false,
        contact: rest.clinic.contact,
        distanceInMiles: rest.clinic.distanceInMiles,
      },
    }
    setCurrentBookingAppointmentData(bookingData)

    if (appointmentType === AppointmentType.InPerson) {
      if (profileState !== clinicState) {
        setShowDifferentStateDialog({
          isOpen: true,
          clinic: bookingData.clinic,
        })
        return
      }
    }

    router.push(`book`)
  }

  return (
    <>
      {slots.slice(0, endIndex).map((slot: AppointmentSlot) => (
        <Button
          key={`${slot.startDate}:${slot.duration}`}
          variant="outline"
          highContrast
          style={{ boxShadow: 'none' }}
          className="hover:text-white whitespace-nowrap text-[16px] text-[#24366B] outline outline-1 outline-[#b9bbc6] hover:bg-accent-12 hover:outline-accent-12"
          onClick={() => handleSlotClick(slot)}
        >
          {getTimeLabel(slot.startDate)}
        </Button>
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
      <Text className="text-[12px] font-[500]">Language:</Text>
      <Text className="text-pp-gray-1 text-[12px] font-[500]">
        {spokenLanguages.join(', ')}
      </Text>
    </Flex>
  )
}

const renderDistance = (clinic: AppointmentClinic) => {
  if (clinic?.distanceInMiles === undefined) {
    return null
  }

  return (
    <Flex align="center" gap="2">
      <Text className="text-[12px] font-[500]">Distance:</Text>
      <Text className="text-pp-gray-1 text-[12.5px] font-[500]">
        {Math.round(clinic.distanceInMiles * 10) / 10} mi
      </Text>
    </Flex>
  )
}

export {
  AvailabilityList,
  PrimaryProviderAvailabilityCard,
  AppointmentTimeSlots,
  renderDistance,
  renderSpokenLanguages,
}
