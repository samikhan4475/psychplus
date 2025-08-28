'use client'

import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { AppointmentSlot } from '@psychplus-v2/types'
import { Staff } from '@psychplus/staff'
import { isMobile } from '@psychplus/utils/client'
import { PersonalDetailsModal } from '@/widgets/schedule-appointment/personal-details'
import { PATIENT_APP_URL } from '@psychplus-v2/env'
import { useStore } from '../../store'
import type { ClinicWithSlots } from '../../types'
import { organizeSlotsByDate } from '../../utils'
import { MobileSlotComponent, SlotComponent } from './weekly-availability-slots'


const LegacyWeeklyAvailabilitySlots = ({
  staff,
  staffTypeCode,
  clinicWithSlots,
  stripeKey,
  mapKey,
}: {
  staff: Staff
  staffTypeCode: number
  clinicWithSlots: ClinicWithSlots | undefined
  stripeKey: string
  mapKey: string
}) => {
  const { filters } = useStore()
  
  // Modal state for legacy component
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null)

  return (
    <>
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
              setIsModalVisible={setIsModalVisible}
              setSelectedSlot={setSelectedSlot}
            />
          ) : (
            <MobileSlotComponent
              slots={slots}
              clinicWithSlots={clinicWithSlots}
              staff={staff}
              staffTypeCode={staffTypeCode}
              setIsModalVisible={setIsModalVisible}
              setSelectedSlot={setSelectedSlot}
            />
          )}
        </Flex>
      ))}
    </Flex>
    <PersonalDetailsModal
        isVisible={isModalVisible}
        slot={selectedSlot}
        staff={staff}
        clinic={clinicWithSlots?.clinic}
        onCancel={() => setIsModalVisible(false)}
        mapKey={mapKey}
        patientAppUrl={PATIENT_APP_URL ?? ''}
        openInsurancePaymentModal={() => {}}
      />
    </>
  )
}

export {LegacyWeeklyAvailabilitySlots}