'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppointmentSlot } from '@psychplus-v2/types'
import { getCalendarDateLabel } from '@psychplus-v2/utils'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Staff } from '@psychplus/staff'
import { isMobile } from '@psychplus/utils/client'
import { formatTimeWithAmPm } from '@psychplus/utils/time'
import { clickTrack } from '@psychplus/utils/tracking'
import { SlotStateRenderer } from '@/components-v2/slot-state-render'
import { enums, PSYCHPLUS_LIVE_URL } from '@/constants'
import { useInViewOnce } from '@/hooks'
import { useSlots } from '@/hooks/use-slots'
import { useStore } from '../../store'
import type { ClinicWithSlots } from '../../types'
import {
  getNormalizedAppointmentType,
  getNormalizedProviderType,
  getValidStartDate,
  organizeSlotsByDate,
} from '../../utils'

interface WeeklyAvailabilitySlotsProps {
  staff: Staff
  staffTypeCode: number
  clinicWithSlots: ClinicWithSlots
  slotsLoading?: boolean
  setSlotsLoading?: (val: boolean) => void
  onClinicChange?: (index: number) => void
  selectedClinic?: number
}

const WeeklyAvailabilitySlots = ({
  staff,
  staffTypeCode,
  clinicWithSlots,
  slotsLoading,
  setSlotsLoading,
  onClinicChange,
  selectedClinic,
}: WeeklyAvailabilitySlotsProps) => {
  const {
    handleFiltersChange,
    filters: { startingDate, appointmentType, providerType, zipCode, sortBy },
  } = useStore()
  const [ref, inViewOnce] = useInViewOnce<HTMLDivElement>()
  const {
    showSlots,
    slotState,
    dateIsInFuture,
    nextAvailableSlotDate,
    fetchSlots,
    dateRange,
    errorMessage,
  } = useSlots({
    providerId: staff.id,
    clinicId: clinicWithSlots.clinic.id,
    appointmentType: getNormalizedAppointmentType(appointmentType),
    providerType: getNormalizedProviderType(providerType),
    zipCode: zipCode ?? '',
    startingDate: getValidStartDate(startingDate),
    selectedClinic,
    onClinicChange,
    setSlotsLoading,
    rawStartingDate: startingDate,
    transformFn: (data) => organizeSlotsByDate(data, startingDate),
    inViewOnce,
  })

  useEffect(() => {
    if (!sortBy || sortBy === 'Nearest') {
      onClinicChange?.(0)
    }
  }, [sortBy])

  return (
    <Flex
      gap="4"
      className="w-full max-sm:ml-0 sm:ml-[100px] md:ml-0 lg:ml-[53px]"
      justify="center"
      ref={ref}
    >
      <SlotStateRenderer
        slotsLoading={slotsLoading}
        errorMessage={errorMessage}
        showSlots={showSlots}
        dateIsInFuture={dateIsInFuture}
        slotState={slotState.current}
        nextAvailableSlotDate={nextAvailableSlotDate}
        dateRange={dateRange}
        fetchSlots={fetchSlots}
        handleGoToAppointment={(dateLabel) =>
          handleFiltersChange({
            startingDate: dateLabel,
          })
        }
        renderSlotList={({ date }) => {
          const key = getCalendarDateLabel(date)
          const slots = slotState.current[key] ?? []

          return (
            <Flex className="w-full">
              {!isMobile() ? (
                <SlotComponent
                  slots={slots}
                  clinicWithSlots={clinicWithSlots}
                  staff={staff}
                  staffTypeCode={staffTypeCode}
                />
              ) : (
                <MobileSlotComponent
                  slots={slots}
                  clinicWithSlots={clinicWithSlots}
                  staff={staff}
                  staffTypeCode={staffTypeCode}
                />
              )}
            </Flex>
          )
        }}
      />
    </Flex>
  )
}

const MobileSlotComponent = ({
  slots,
  clinicWithSlots,
  staff,
  staffTypeCode,
}: {
  slots?: AppointmentSlot[]
  clinicWithSlots: ClinicWithSlots | undefined
  staff: Staff
  staffTypeCode: number
}) => {
  const { setBookedSlot, filters } = useStore()
  const router = useRouter()

  const searchParams = useSearchParams()

  const state = searchParams.get('state')

  function setMobileBookedSlotDetails(slot: AppointmentSlot) {
    setBookedSlot({
      specialist: staff,
      clinic: clinicWithSlots?.clinic,
      type: filters.appointmentType,
      specialistTypeCode: staffTypeCode,
      duration: slot.duration,
      startDate: slot.startDate,
      state: state ?? '',
      servicesOffered: slot.servicesOffered,
      ...(slot?.locationId && { locationId: slot?.locationId }),
    })

    parent.postMessage(
      {
        event: enums.APPOINTMENT_SELECTED,
      },
      PSYCHPLUS_LIVE_URL,
    )

    clickTrack({
      productArea: 'Patient',
      productPageKey: 'Schedule Appointment Screen',
      clickAction: 'Navigation',
      clickActionData: 'Clicked Slot',
    })

    router.push(`/schedule-appointment/personal-details`)
  }

  return (
    <Flex className="flex-row overflow-x-auto whitespace-nowrap pb-4" gap="4">
      {slots && slots?.length > 0 ? (
        slots?.map((slot, i) => (
          <SlotItem
            key={`${slot.startDate}-${i}`}
            slot={slot}
            onBookedSlot={setMobileBookedSlotDetails}
          />
        ))
      ) : (
        <Text>No slots available</Text>
      )}
    </Flex>
  )
}

const SlotComponent = ({
  slots,
  clinicWithSlots,
  staff,
  staffTypeCode,
}: {
  slots: AppointmentSlot[] | undefined
  clinicWithSlots: ClinicWithSlots | undefined
  staff: Staff
  staffTypeCode: number
}) => {
  const [showAll, setShowAll] = useState(false)
  const handleShowMore = () => setShowAll(!showAll)
  const { setBookedSlot, filters } = useStore()
  const router = useRouter()

  const searchParams = useSearchParams()

  const state = searchParams.get('state')

  function setBookedSlotDetails(slot: AppointmentSlot) {
    setBookedSlot({
      clinic: clinicWithSlots?.clinic,
      specialist: staff,
      specialistTypeCode: staffTypeCode,
      type: filters.appointmentType,
      startDate: slot.startDate,
      duration: slot.duration,
      servicesOffered: slot.servicesOffered,
      state: state ?? '',
      ...(slot?.locationId && { locationId: slot?.locationId }),
    })

    parent.postMessage(
      {
        event: enums.APPOINTMENT_SELECTED,
      },
      PSYCHPLUS_LIVE_URL,
    )

    clickTrack({
      productArea: 'Patient',
      productPageKey: 'Schedule Appointment Screen',
      clickAction: 'Navigation',
      clickActionData: 'Clicked Slot',
    })

    router.push(`/schedule-appointment/personal-details`)
  }

  return (
    <Flex className="flex-1 flex-col whitespace-nowrap pb-4" gap="4">
      {slots &&
        slots
          .slice(0, showAll || isMobile() ? slots.length : 3)
          .map((slot, i) => (
            <SlotItem
              key={`${slot.startDate}-${i}`}
              slot={slot}
              onBookedSlot={setBookedSlotDetails}
            />
          ))}
      {!isMobile() && slots && slots?.length > 3 && (
        <Button
          className="h-[36px] w-full rounded-[40px] bg-[#f0f4ff] p-2 text-[14px] font-medium leading-5 text-[#24366b] hover:bg-[#151B4A] hover:text-[white]"
          onClick={handleShowMore}
        >
          <Text>{showAll ? 'Less' : 'More'}</Text>
        </Button>
      )}
    </Flex>
  )
}

const SlotItem = ({
  slot,
  onBookedSlot,
}: {
  slot: AppointmentSlot
  onBookedSlot: (slot: AppointmentSlot) => void
}) => (
  <Button
    variant="outline"
    highContrast
    className="min-h-[2.25rem] cursor-pointer rounded-[4px] border border-[#b9bbc6] px-3 text-[14px] font-medium leading-[20px] text-[#24366b] hover:bg-[#151B4A] hover:text-[white] sm:rounded-3"
    onClick={() => onBookedSlot(slot)}
  >
    {formatTimeWithAmPm(slot.startDate)}
  </Button>
)

export { WeeklyAvailabilitySlots, SlotComponent, MobileSlotComponent }
