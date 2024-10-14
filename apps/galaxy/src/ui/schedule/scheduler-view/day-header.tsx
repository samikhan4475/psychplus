'use client'

import { useEffect } from 'react'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { addDays } from 'date-fns'
import { cn } from '@/utils'
import { NavigationButton } from './navigation-button'
import { useStore } from './store'

const DayHeader = () => {
  const appointmentDates = useStore((state) => state.dates)
  const setAppointmentDates = useStore((state) => state.setDates)
  const serverProviderAvailabilities = useStore((state) => state.data)

  useEffect(() => {
    const currentDate = new Date()
    setAppointmentDates(currentDate)
  }, [])

  const handleForwardNavigation = () => {
    const nextDay = addDays(appointmentDates[0].date, 1)
    setAppointmentDates(nextDay)
  }

  const handleBackwardNavigation = () => {
    const prevDay = addDays(appointmentDates[0].date, -1)
    setAppointmentDates(prevDay)
  }

  return (
    <Grid columns="16" className="mx-[26px] mt-[7px]" position="sticky" top="0">
      <Flex align='center'>
      <Text className="text-pp-black-3 col-span-2 text-[14px] font-[590]">{`${serverProviderAvailabilities.length} Providers`}</Text>
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
        <Grid
          columns="14"
          className="border-pp-focus-bg h-7 w-full border border-b-[2px]"
        >
          {appointmentDates.map((day, i) => (
            <Flex
              align="center"
              justify="center"
              key={day.monthAndDay}
              className={cn('relative px-2', {
                "after:bg-pp-focus-bg after:absolute after:bottom-0 after:right-0 after:top-0 after:w-[2px] after:translate-x-1/2 after:content-['']":
                  i === 6,
              })}
            >
              <Flex
                align="center"
                justify="center"
                className={cn('gap-x-[3px] text-[12px]')}
              >
                <Text className="text-pp-text-sub text-[12px] font-[510]">
                  {day.day}
                </Text>
                <Text className="text-[12px] font-[510]">
                  {day.monthAndDay}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Grid>
      </Box>
    </Grid>
  )
}

export { DayHeader }
