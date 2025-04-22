import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { UpcomingAppointmentsTable } from './upcoming-appointments-table'

interface UpcomingAppointmentsBlockProps {
  appointments: Appointment[]
}

const UpcomingAppointmentsBlock = ({
  appointments,
}: UpcomingAppointmentsBlockProps) => {
  return (
    <Flex direction="column" gap="1" className="bg-white my-2 rounded-1 p-2 ">
      <Text className="text-[16px] font-[600] text-accent-12">
        Upcoming Appointments
      </Text>
      <UpcomingAppointmentsTable appointments={appointments} />
    </Flex>
  )
}

export { UpcomingAppointmentsBlock }
