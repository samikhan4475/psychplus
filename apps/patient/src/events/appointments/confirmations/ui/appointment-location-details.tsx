'use client'

import {
  getClinicAddressLabel,
  getLocalCalendarDate,
  getSlashedDateString,
  getTimeLabel,
} from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { useStore } from '../store'

const AppointmentLocationDetails = () => {
  const { appointment } = useStore()
  if (!appointment) return

  const slotDate = getLocalCalendarDate(appointment.startDate)

  return (
    <Flex direction="column" gap="1">
      <Text size="3" className="font-medium text-[black]">
        {appointment.locationName}
      </Text>
      <Text className="text-pp-gray-1 text-[12px]">
        {getClinicAddressLabel([appointment.locationAddress])}
      </Text>
      <Text className="text-pp-gray-1 text-[12px]">
        Date:{' '}
        <Text className="text-[#194595]">
          {getSlashedDateString(slotDate, true)}
        </Text>
      </Text>
      <Text className="text-pp-gray-1 text-[12px]">
        Time:{' '}
        <Text className="text-[#194595]">
          {getTimeLabel(appointment.startDate)}
        </Text>
      </Text>
    </Flex>
  )
}

export { AppointmentLocationDetails }
