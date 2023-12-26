'use client'

import { Button, Flex, Text } from '@radix-ui/themes'

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
            <Text size="5" className="font-bold">
              Book an appointment
            </Text>
          </Flex>
          <Flex gap="4">
            <Button size="3" color="blue" className="w-48 whitespace-nowrap">
              PSYCHIATRIST
            </Button>
            <Button size="3" color="blue" className="w-48 whitespace-nowrap">
              THERAPIST
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export { ScheduledAppointmentCard }
