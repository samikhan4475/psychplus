'use client'

import React, { useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { addDays, format } from 'date-fns'
import { TIMEZONE_FORMAT } from '@psychplus/utils/constants'
import { formatDateYmd } from '@psychplus/utils/time'
import { LeftArrowIcon, RightArrowIcon } from '@/components'
import { useStore } from '../../store'

const WeekCalendarRow = () => {
  const [startDate, setStartDate] = useState(new Date())

  const { handleFiltersChange } = useStore()

  const renderDays = () =>
    Array.from({ length: 7 }, (_, i) => addDays(startDate, i)).map(renderDay)

  const handleWeekChange = (daysToAdd: number) => {
    handleFiltersChange({
      startingDate: formatDateYmd(addDays(startDate, daysToAdd)),
    })
    setStartDate(addDays(startDate, daysToAdd))
  }

  return (
    <Flex align="center">
      <Flex onClick={() => handleWeekChange(-7)} className="cursor-pointer">
        <LeftArrowIcon />
      </Flex>
      <Flex mx="3">{renderDays()}</Flex>
      <Flex onClick={() => handleWeekChange(7)} className="cursor-pointer">
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
      className="h-10 w-24 rounded-3"
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
