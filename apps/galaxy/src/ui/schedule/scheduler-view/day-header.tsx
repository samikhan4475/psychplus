'use client'

import { useEffect } from 'react'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { addDays } from 'date-fns'
import { cn } from '@/utils'
import { NavigationButton } from './navigation-button'
import { useStore } from './store'
import { getCurrentWeekStart } from './utils'

const DayHeader = ({ noOfDays = 13 }: { noOfDays?: number }) => {
  const appointmentDates = useStore((state) => state.dates)
  const setAppointmentDates = useStore((state) => state.setDates)
  const serverProviderAvailabilities = useStore((state) => state.data)

  useEffect(() => {
    const currentDate = getCurrentWeekStart()
    setAppointmentDates(currentDate, noOfDays)
  }, [setAppointmentDates, noOfDays])

  const handleForwardNavigation = () => {
    const nextDay = addDays(appointmentDates[0].date, 1)
    setAppointmentDates(nextDay, noOfDays)
  }

  const handleBackwardNavigation = () => {
    const prevDay = addDays(appointmentDates[0].date, -1)
    setAppointmentDates(prevDay, noOfDays)
  }

  return (
    <Grid columns="16" className="pl-2.5 pr-5 mt-[7px]" position="sticky" top="0">
      <Flex align="center">
        <Text className="text-pp-black-3 col-span-2 text-[14px] font-bold">{`${serverProviderAvailabilities.length} Providers`}</Text>
      </Flex>
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
        <Flex
          className="border-pp-focus-bg h-7 w-full border border-b-[2px]"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {appointmentDates.map((day, i) => (
            <Flex
              align="center"
              justify="center"
              key={day.monthAndDay}
              className={cn('relative flex-1', {
                "after:bg-pp-focus-bg after:absolute after:bottom-0 after:right-0 after:top-0 after:w-[2px] after:translate-x-1/2 after:content-['']":
                  noOfDays !== 6 && i === 6,
              })}
            >
              <Flex
                align="center"
                justify="center"
                className={cn('gap-x-[3px] text-[12px]')}
              >
                <Text className="text-pp-text-sub text-[12px] font-medium">
                  {day.day}
                </Text>
                <Text className="text-[12px] font-bold">{day.monthAndDay}</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Grid>
  )
}

export { DayHeader }
