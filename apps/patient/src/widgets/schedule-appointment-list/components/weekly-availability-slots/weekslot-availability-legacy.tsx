'use client'

import { Flex } from '@radix-ui/themes'

import { Staff } from '@psychplus/staff'
import { isMobile } from '@psychplus/utils/client'

import { useStore } from '../../store'
import type { ClinicWithSlots } from '../../types'
import { organizeSlotsByDate } from '../../utils'
import { MobileSlotComponent, SlotComponent } from './weekly-availability-slots'


const LegacyWeeklyAvailabilitySlots = ({
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
        <Flex className="w-full" key={`${date}-${i}`}>
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
      ))}
    </Flex>
  )
}

export {LegacyWeeklyAvailabilitySlots}