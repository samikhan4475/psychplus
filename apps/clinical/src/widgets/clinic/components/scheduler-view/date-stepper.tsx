import { Box, Flex, Text } from '@radix-ui/themes'
import { addDays } from 'date-fns'
import { useStore } from '../../store'
import { NavigationButton } from './navigation-button'

const DateStepper = () => {
  const appointmentDates = useStore((state) => state.appointmentDays)
  const setAppointmentDates = useStore((state) => state.setAppointmentDates)
  const endDateIndex = appointmentDates.length - 1

  const stepForward = () => {
    const nextWeekDay = addDays(
      appointmentDates[0].date,
      appointmentDates.length,
    )
    setAppointmentDates(nextWeekDay)
  }

  const stepBackward = () => {
    const previousWeekDay = addDays(
      appointmentDates[0].date,
      -appointmentDates.length,
    )
    setAppointmentDates(previousWeekDay)
  }

  return (
    <Flex className="lg:flex-0 flex-1 gap-x-2" align="center" justify="center">
      <NavigationButton onClick={stepBackward} direction="left" />
      <Flex className="gap-x-2" align="center">
        <Text className="text-[12px] font-[500]">{`${appointmentDates[0].day} ${appointmentDates[0].monthAndDay}`}</Text>
        <Box className="h-[1.4px] w-[12.6px] rounded-[1px] bg-[#A0B6DC]"></Box>
        <Text className="text-[12px] font-[500]">{`${appointmentDates[endDateIndex].day} ${appointmentDates[endDateIndex].monthAndDay}`}</Text>
      </Flex>
      <NavigationButton onClick={stepForward} direction="right" />
    </Flex>
  )
}

export { DateStepper }
