import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { addDays } from 'date-fns'
import { cn } from '@psychplus/ui/cn'
import { useStore } from '../../store'
import { NavigationButton } from './navigation-button'

const DayHeader = () => {
  const appointmentDates = useStore((state) => state.appointmentDays)
  const setAppointmentDates = useStore((state) => state.setAppointmentDates)
  const serverProviderAvailabilities = useStore(state => state.appointmentAvailabilities)

  const handleForwardNavigation = () => {
    const nextDay = addDays(appointmentDates[0].date, 1)
    setAppointmentDates(nextDay)
  }

  const handleBackwardNavigation = () => {
    const prevDay = addDays(appointmentDates[0].date, -1)
    setAppointmentDates(prevDay)
  }

  return (
    <Grid columns="17" className="mt-[7px]">
      <Text className="col-span-2 px-[17px] text-[14px] font-[590] text-[#1C2024]">{`${serverProviderAvailabilities.length} Providers`}</Text>
      <Box className="relative z-10 col-[3_/_span_14]">
        <NavigationButton
          className="absolute left-0 top-[50%] z-20 -translate-x-1/2 -translate-y-1/2"
          onClick={handleBackwardNavigation}
          direction="left"
        />
        <NavigationButton
          className="absolute right-0 top-[50%] z-20 -translate-y-1/2 translate-x-1/2"
          onClick={handleForwardNavigation}
          direction="right"
        />
        <Grid
          columns="14"
          className="h-7 w-full border border-b-[2px] border-[#D9E2FC]"
        >
          {appointmentDates.map((day, i) => (
            <Flex
              align="center"
              justify="center"
              key={day.monthAndDay}
              className={cn('relative px-2', {
                "after:absolute after:bottom-0 after:right-0 after:top-0 after:w-[2px] after:translate-x-1/2 after:bg-[#D9E2FC] after:content-['']":
                  i === 6,
              })}
            >
              <Flex
                align="center"
                justify="center"
                className={cn('gap-x-[3px] text-[12px]')}
              >
                <span className="text-[12px] font-[510] text-[#60646C]">
                  {day.day}
                </span>
                <span className="text-[12px] font-[510]">
                  {day.monthAndDay}
                </span>
              </Flex>
            </Flex>
          ))}
        </Grid>
      </Box>
    </Grid>
  )
}

export { DayHeader }
