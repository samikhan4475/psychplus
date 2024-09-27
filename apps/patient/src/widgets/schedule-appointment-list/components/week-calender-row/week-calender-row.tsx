'use client'

import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { addDays, format } from 'date-fns'
import { isMobile } from '@psychplus/utils/client'
import {
  formatDateYmd,
  getFirstDayOfWeek,
  parseDateString,
} from '@psychplus/utils/time'
import { LeftArrowIcon, RightArrowIcon } from '@/components'
import { useStore } from '../../store'

const WeekCalendarRow = () => {
  const daysToAdd = isMobile() ? 1 : 7

  const { handleFiltersChange, filters, currentWeekReel, setCurrentWeekReel } =
    useStore()

  const [startDate, setStartDate] = useState(
    filters.startingDate
      ? parseDateString(filters.startingDate)
      : getFirstDayOfWeek(),
  )

  const renderDays = () =>
    Array.from({ length: daysToAdd }, (_, i) => addDays(startDate, i)).map(
      renderDay,
    )

  const handleWeekChange = (daysToAdd: number) => {
    const newWeekReel =
      daysToAdd < 0 ? currentWeekReel - 1 : currentWeekReel + 1
    setCurrentWeekReel(newWeekReel)
    handleFiltersChange({
      startingDate: formatDateYmd(addDays(startDate, daysToAdd)),
    })
    setStartDate(addDays(startDate, daysToAdd))
  }

  return (
    <Flex align="center" className="w-full">
      <Flex
        onClick={() => {
          if (currentWeekReel > 0) {
            handleWeekChange(-daysToAdd)
          }
        }}
        className={
          currentWeekReel > 0
            ? 'cursor-pointer'
            : 'cursor-not-allowed opacity-50'
        }
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
  const date = currentDate.toLocaleString('en-US')
  const today = new Date().toLocaleString('en-US')

  return (
    <Flex
      key={currentDate.toString()}
      align="center"
      className="h-10 w-full rounded-3 sm:w-24"
      justify="center"
    >
      {format(new Date(date), 'yyyy-MM-dd') ===
      format(new Date(today), 'yyyy-MM-dd') ? (
        <Flex gap="1" align="baseline">
          <Text className="absolute -mt-[16px] text-[12px] font-medium text-[#194595]">
            Today
          </Text>
          <Text className="text-[#575759]" size="2">
            {format(new Date(date), 'EEE')}
          </Text>
          <Text className="text-[#151B4A]">
            {format(new Date(date), 'MMM d')}
          </Text>
        </Flex>
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
