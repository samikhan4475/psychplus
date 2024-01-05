'use client'

import React, { useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { addDays, format, isToday } from 'date-fns'
import {
  darkGrayColor,
  LeftArrowIcon,
  psychPlusBlueColor,
  RightArrowIcon,
} from '@/components'

const CalendarRow = () => {
  const [startDate, setStartDate] = useState(new Date())

  const renderDays = () =>
    Array.from({ length: 7 }, (_, i) => addDays(startDate, i)).map(renderDay)

  const handleWeekChange = (daysToAdd: number) =>
    setStartDate(addDays(startDate, daysToAdd))

  return (
    <Flex align="center">
      <Flex onClick={() => handleWeekChange(-7)}>
        <LeftArrowIcon />
      </Flex>
      <Flex ml="5">{renderDays()}</Flex>

      <Flex onClick={() => handleWeekChange(7)}>
        <RightArrowIcon />
      </Flex>
    </Flex>
  )
}

const renderDay = (currentDate: Date) => (
  <Flex
    key={currentDate.toString()}
    align="center"
    className="h-10 w-24 rounded-3"
  >
    {isToday(currentDate) ? (
      <Text style={{ color: psychPlusBlueColor }}>Today</Text>
    ) : (
      <Flex gap="1" align="baseline">
        <Text style={{ color: darkGrayColor }} size="2">
          {format(currentDate, 'EEE')}
        </Text>
        <Text style={{ color: psychPlusBlueColor }}>
          {format(currentDate, 'MMM d')}
        </Text>
      </Flex>
    )}
  </Flex>
)

export { CalendarRow }
