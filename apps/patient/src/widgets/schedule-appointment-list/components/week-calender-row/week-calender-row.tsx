'use client'

import React, { useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { addDays, format } from 'date-fns'
import { isMobile } from '@psychplus/utils/client'
import { TIMEZONE_FORMAT } from '@psychplus/utils/constants'
import { formatDateYmd } from '@psychplus/utils/time'
import { LeftArrowIcon, RightArrowIcon } from '@/components'
import { useStore } from '../../store'

const WeekCalendarRow = () => {
  const daysToAdd = isMobile() ? 1 : 7

  const [startDate, setStartDate] = useState(new Date())

  const { handleFiltersChange } = useStore()

  const renderDays = () =>
    Array.from({ length: daysToAdd }, (_, i) => addDays(startDate, i)).map(
      renderDay,
    )

  const handleWeekChange = (daysToAdd: number) => {
    handleFiltersChange({
      startingDate: formatDateYmd(addDays(startDate, daysToAdd)),
    })
    setStartDate(addDays(startDate, daysToAdd))
  }

  return (
    <Flex align="center" className="w-full">
      <Flex
        onClick={() => handleWeekChange(-daysToAdd)}
        className="cursor-pointer"
      >
        <LeftArrowIcon />
      </Flex>
      <Flex className="w-full sm:w-auto" mx="3">
        {renderDays()}
      </Flex>
      <Flex
        onClick={() => handleWeekChange(daysToAdd)}
        className="cursor-pointer"
      >
        <RightArrowIcon />
      </Flex>
    </Flex>
  )
}

const renderDay = (currentDate: Date) => {
  const date = currentDate.toLocaleString('en-US', {
    timeZone: TIMEZONE_FORMAT,
  })

  const today = new Date().toLocaleString('en-US', {
    timeZone: TIMEZONE_FORMAT,
  })

  return (
    <Flex
      key={currentDate.toString()}
      align="center"
      className="h-10 w-full rounded-3 sm:w-24"
      justify="center"
    >
      {format(new Date(date), 'yyyy-MM-dd') ===
      format(new Date(today), 'yyyy-MM-dd') ? (
        <Text className="text-[#151B4A]">Today</Text>
      ) : (
        <Flex gap="1" align="baseline">
          <Text className="text-[#575759]" size="2">
            {format(new Date(date), 'EEE')}
          </Text>
          <Text className="text-[#151B4A]">
            {format(new Date(date), 'MMM d')}
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

export { WeekCalendarRow }
