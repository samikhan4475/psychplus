'use client'

import { getAppointmentTypeLabel, getUserFullName } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { ProviderAvatar } from '@/components-v2'
import { useStore } from '../store'

const AppointmentProviderDetails = () => {
  const { appointment } = useStore()
  if (!appointment) return

  const specialist = {
    legalName: appointment.physicianName,
    hasPhoto: false,
    id: 1,
    rating: 0,
  }

  return (
    <Flex gap="3" align="center" mt="6" className="w-full">
      <ProviderAvatar provider={specialist} size="6" />
      <Flex direction="column" gap="1" className="text-left">
        <Text size="3" className="text-black font-[590]">
          {getUserFullName(appointment.physicianName, true)}
        </Text>
        <Text size="1" className="text-pp-blue-3 text-[13px]">
          {getAppointmentTypeLabel(appointment.type).toLocaleUpperCase()}
        </Text>
      </Flex>
    </Flex>
  )
}

export { AppointmentProviderDetails }
