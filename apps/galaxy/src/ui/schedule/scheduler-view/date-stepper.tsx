'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { addDays } from 'date-fns'
import { NavigationButton } from './navigation-button'
import { useStore } from './store'

const DateStepper = ({ noOfDays = 13 }: { noOfDays?: number }) => {
  const appointmentDates = useStore((state) => state.dates)
  const setAppointmentDates = useStore((state) => state.setDates)
  const endDateIndex = appointmentDates.length - 1

  const stepForward = () => {
    const nextWeekDay = addDays(
      appointmentDates[0].date,
      appointmentDates.length,
    )
    setAppointmentDates(nextWeekDay, noOfDays)
  }

  const stepBackward = () => {
    const previousWeekDay = addDays(
      appointmentDates[0].date,
      -appointmentDates.length,
    )
    setAppointmentDates(previousWeekDay, noOfDays)
  }

  return (
    <Flex className="lg:flex-0 flex-1 gap-x-2" align="center" justify="center">
      <NavigationButton onClick={stepBackward} direction="left" />
      <Flex className="gap-x-2" align="center">
        <Text className="text-[12px] font-[500]">{`${
          appointmentDates[0]?.day ?? ''
        } ${appointmentDates[0]?.monthAndDay ?? ''}`}</Text>
        <Box className="bg-pp-primary-light h-[1.4px] w-[12.6px] rounded-[1px]"></Box>
        <Text className="text-[12px] font-[500]">{`${
          appointmentDates[endDateIndex]?.day ?? ''
        } ${appointmentDates[endDateIndex]?.monthAndDay ?? ''}`}</Text>
      </Flex>
      <NavigationButton onClick={stepForward} direction="right" />
    </Flex>
  )
}

export { DateStepper }
