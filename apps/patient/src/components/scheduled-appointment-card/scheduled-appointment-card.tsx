'use client'

import { Flex, Text } from '@radix-ui/themes'
import { ScheduleAppointmentDialog } from '@/components'

//we will fetch this Data from API
const nextAvailableAppointments = []

const ScheduledAppointmentCard = () => {
  return (
    <Flex
      className="flex-grow rounded-6 border border-gray-2 shadow-3 "
      p="6"
      direction="column"
      justify="center"
    >
      {nextAvailableAppointments.length > 0 ? (
        <Text size="7" className="font-bold">
          Next Available Appointments
        </Text>
      ) : (
        <Flex justify="center" direction="column" align="center" gap="3">
          <Flex>
            <Text size="7" className="font-bold">
              Book an appointment
            </Text>
          </Flex>
          <Flex gap="4" className="flex-row max-xs:flex-col">
            <ScheduleAppointmentDialog title="PSYCHIATRIST" />
            <ScheduleAppointmentDialog title="THERAPIST" />
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export { ScheduledAppointmentCard }
