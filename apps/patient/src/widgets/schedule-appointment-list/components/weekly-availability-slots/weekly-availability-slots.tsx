'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Slot } from '@psychplus/appointments'
import { Staff } from '@psychplus/staff'
import { isMobile } from '@psychplus/utils/client'
import { formatTimeWithAmPm } from '@psychplus/utils/time'
import { clickTrack } from '@psychplus/utils/tracking'
import { useStore } from '../../store'
import type { ClinicWithSlots } from '../../types'
import { organizeSlotsByDate } from '../../utils'
import { enums, PSYCHPLUS_LIVE_URL } from '@/constants'

const WeeklyAvailabilitySlots = ({
  staff,
  staffTypeCode,
  clinicWithSlots,
}: {
  staff: Staff
  staffTypeCode: number
  clinicWithSlots: ClinicWithSlots | undefined
}) => {
  const { filters } = useStore()

  return (
    <Flex gap="4" className="w-full">
      {Object.entries(
        organizeSlotsByDate(
          clinicWithSlots?.availableSlots,
          filters.startingDate,
        ),
      ).map(([date, slots], i) => (
        <Flex className="w-full sm:w-20" key={`${date}-${i}`}>
          <SlotComponent
            slots={slots}
            clinicWithSlots={clinicWithSlots}
            staff={staff}
            staffTypeCode={staffTypeCode}
          />
        </Flex>
      ))}
    </Flex>
  )
}

const SlotComponent = ({
  slots,
  clinicWithSlots,
  staff,
  staffTypeCode,
}: {
  slots: Slot[]
  clinicWithSlots: ClinicWithSlots | undefined
  staff: Staff
  staffTypeCode: number
}) => {
  const [showAll, setShowAll] = useState(false)
  const handleShowMore = () => setShowAll(!showAll)
  const { setBookedSlot, filters, address } = useStore()
  const router = useRouter()

  const searchParams = useSearchParams()

  const state = searchParams.get('state')
  
  
  function setBookedSlotDetails(slot: Slot) {
    setBookedSlot({
      clinic: clinicWithSlots?.clinic,
      specialist: staff,
      specialistTypeCode: staffTypeCode,
      type: filters.appointmentType,
      startDate: slot.startDate,
      duration: slot.duration,
      servicesOffered: slot.servicesOffered,
      state: state ?? '',
    })

    if (filters.appointmentType !== "Virtual") {
      if (
        address?.primaryState !== state
      ) {
        router.push(`/widgets/schedule-appointment-confirmation?myState=${address?.primaryState}&providerState=${state}`)
        return
      }
    }

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
    <Flex
        className="flex-row overflow-x-auto whitespace-nowrap pb-4 sm:flex-col"
        gap="4"
      >
        {slots
          .slice(0, showAll || isMobile() ? slots.length : 3)
          .map((slot, i) => (
            <SlotItem
              key={`${slot.startDate}-${i}`}
              slot={slot}
              onBookedSlot={setBookedSlotDetails}
            />
          ))}
          {!isMobile() && slots.length > 3 && (
          <Button
            className="h-[36px] w-full p-2 rounded-[40px] bg-[#f0f4ff] text-[#24366b] font-medium text-[14px] leading-5 hover:bg-[#151B4A] hover:text-[white]"
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
  slot: Slot
  onBookedSlot: (slot: Slot) => void
}) => (
  <Flex
    className="h-[36px] px-3 cursor-pointer rounded-[4px] border border-[#b9bbc6] text-[14px] font-medium leading-[20px] text-[#24366b] hover:text-[white] hover:bg-[#151B4A] sm:rounded-3"
    align="center"
    justify="center"
    p="2"
    onClick={() => onBookedSlot(slot)}
  >
    <Text>{formatTimeWithAmPm(slot.startDate)}</Text>
  </Flex>
)

export { WeeklyAvailabilitySlots }
