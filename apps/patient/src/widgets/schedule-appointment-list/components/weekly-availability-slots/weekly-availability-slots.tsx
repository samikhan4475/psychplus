'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Slot } from '@psychplus/appointments'
import { Staff } from '@psychplus/staff'
import { isMobile } from '@psychplus/utils/client'
import { formatTimeWithAmPm } from '@psychplus/utils/time'
import { useStore } from '../../store'
import type { ClinicWithSlots } from '../../types'
import { organizeSlotsByDate } from '../../utils'

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
  const { setBookedSlot, filters } = useStore()
  const router = useRouter()

  function setBookedSlotDetails(slot: Slot) {
    setBookedSlot({
      clinic: clinicWithSlots?.clinic,
      specialist: staff,
      specialistTypeCode: staffTypeCode,
      type: filters.appointmentType,
      startDate: slot.startDate,
      duration: slot.duration,
    })
    router.push(`/schedule-appointment/personal-details`)
  }

  return (
    <Flex
      className="flex-row overflow-x-auto whitespace-nowrap pb-4 sm:flex-col"
      gap="2"
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
          className="h-[38px] rounded-3 bg-[white] text-[#151B4A] hover:bg-[#151B4A] hover:text-[white]"
          style={{ border: '1px solid #151B4A' }}
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
    className="h-[38px] w-20 cursor-pointer rounded-[20px] border border-[#151B4A] text-[#151B4A] hover:bg-[#151B4A] hover:text-[white] sm:rounded-3"
    align="center"
    justify="center"
    p="2"
    onClick={() => onBookedSlot(slot)}
  >
    <Text size="2">{formatTimeWithAmPm(slot.startDate)}</Text>
  </Flex>
)

export { WeeklyAvailabilitySlots }
