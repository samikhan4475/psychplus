import { useEffect, useMemo, useState } from 'react'
import { AppointmentType } from '@psychplus-v2/constants'
import { Appointment } from '@psychplus-v2/types'
import {
  cn,
  getCalendarDate,
  getCalendarDateLabel,
  getTimeLabel,
} from '@psychplus-v2/utils'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components-v2'
import type {
  AppointmentAvailability,
  AppointmentSlot,
} from '@/features/appointments/search/types'
import { useToast } from '@/providers'
import { searchAppointmentsAction } from '../../search/actions'
import { transformResponseData } from '../../search/actions/data'
import { useStore } from '../../search/store/store'
import { generateDateRange, getStartOfWeek } from '../../search/utils'

interface AvailabilityListProps {
  appointment: Appointment
  selectedSlot: AppointmentSlot | undefined
  setSelectedSlot: (AppointmentSlot: AppointmentSlot) => void
}

const AvailabilityList = ({
  appointment,
  selectedSlot,
  setSelectedSlot,
}: AvailabilityListProps) => {
  const [loading, setLoading] = useState(true)
  const [appointmentAvailability, setAppointmentAvailability] = useState<
    AppointmentAvailability[]
  >([])

  const { toast } = useToast()

  const { startingDate, setStartingDate } = useStore((state) => ({
    startingDate: state.startingDate,
    setStartingDate: state.setStartingDate,
  }))

  useEffect(() => {
    setStartingDate(getStartOfWeek(new Date()))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await searchAppointmentsAction({
        type: appointment.type,
        providerType: appointment.specialistTypeCode,
        startingDate: startingDate,
        maxDaysOutToLook: 7,
        staffIds: [appointment.specialist.id],
        locationIds: [appointment.clinic.id],
        includeDistance: appointment.type === AppointmentType.InPerson,
        includeStaffBio: false,
        currentLocation: null,
        postalCode: appointment.clinic.contact.addresses?.[0]?.postalCode ?? '',
        state: appointment.clinic.contact.addresses?.[0]?.state,
      })

      if (result.state === 'error') {
        toast({
          type: 'error',
          title: result.error,
        })
      } else {
        setAppointmentAvailability(transformResponseData(result.data))
      }
      setLoading(false)
    }

    fetchData()
  }, [startingDate, appointment])

  if (loading) return <LoadingPlaceholder />

  if (!loading && appointmentAvailability.length === 0) {
    return (
      <Flex pt="8" justify="center" className="bg-white flex-1">
        <Text className="text-[18px] text-gray-11">No results</Text>
      </Flex>
    )
  }

  return (
    <>
      {appointmentAvailability.map((availability) => (
        <ProviderAvailabilityCard
          key={availability.specialist.id}
          data={availability}
          appointment={appointment}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      ))}
    </>
  )
}

const ProviderAvailabilityCard = ({
  data,
  appointment,
  selectedSlot,
  setSelectedSlot,
}: {
  data: AppointmentAvailability
  appointment: Appointment
  selectedSlot: AppointmentSlot | undefined
  setSelectedSlot: (AppointmentSlot: AppointmentSlot) => void
}) => {
  const [showMore, setShowMore] = useState(false)

  const { startingDate } = useStore((state) => ({
    startingDate: state.startingDate,
  }))

  const dateRange = useMemo(
    () => generateDateRange(getCalendarDate(startingDate)),
    [startingDate],
  )

  const checkHasMoreSlots = () =>
    Object.values(data.clinics[0].slotsByDay).some(
      (slots) => slots && slots.length > 3,
    )

  return (
    <Flex direction="column" gap="4" className="w-full" px="5" py="5">
      <Flex>
        {dateRange.map((date, i) => (
          <Box key={`${i}-${date.toString()}`} className="flex-1">
            <Flex direction="column" align="center" gap="4">
              {appointment.type === AppointmentType.Virtual ? (
                <AppointmentTimeSlots
                  showMore={showMore}
                  slots={data.allSlotsByDay[getCalendarDateLabel(date)]}
                  selectedSlot={selectedSlot}
                  setSelectedSlot={setSelectedSlot}
                />
              ) : (
                <AppointmentTimeSlots
                  showMore={showMore}
                  slots={data.clinics[0].slotsByDay[getCalendarDateLabel(date)]}
                  selectedSlot={selectedSlot}
                  setSelectedSlot={setSelectedSlot}
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
          radius="full"
          className="bg-pp-blue-1 w-full text-accent-12"
        >
          {showMore ? 'See less' : 'See more'}
        </Button>
      ) : null}
    </Flex>
  )
}

const AppointmentTimeSlots = ({
  slots,
  showMore,
  selectedSlot,
  setSelectedSlot,
}: {
  slots?: AppointmentSlot[]
  showMore: boolean
  selectedSlot: AppointmentSlot | undefined
  setSelectedSlot: (AppointmentSlot: AppointmentSlot) => void
}) => {
  if (!slots || slots.length === 0) {
    return null
  }

  const endIndex = showMore ? slots.length : 3

  return (
    <>
      {slots.slice(0, endIndex).map((slot: AppointmentSlot) => (
        <Button
          variant="outline"
          color="gray"
          radius="full"
          className={cn(
            'hover:text-white h-9 w-24 whitespace-nowrap text-[15px] hover:bg-[#151B4A]',
            selectedSlot === slot
              ? 'bg-[#151B4A] text-[white] outline-[#151B4A]'
              : 'text-[#151B4A]',
          )}
          key={`${slot.startDate}:${slot.duration}`}
          onClick={() => setSelectedSlot(slot)}
        >
          {getTimeLabel(slot.startDate)}
        </Button>
      ))}
    </>
  )
}

export { AvailabilityList }
