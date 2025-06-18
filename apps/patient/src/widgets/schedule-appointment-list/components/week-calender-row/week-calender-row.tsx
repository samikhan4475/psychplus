'use client'

import React, { useState } from 'react'
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

  const renderDays = () => {
    if (isMobile()) {
      const today = new Date()
      const weekStart = getFirstDayOfWeek() // default week start
      const weekEnd = addDays(weekStart, 6)

      const isTodayInDefaultWeek = today >= weekStart && today <= weekEnd

      return [
        renderDay(
          currentWeekReel === 0 && isTodayInDefaultWeek ? today : startDate,
        ),
      ]
    }

    const monday = getFirstDayOfWeek(startDate)

    return Array.from({ length: 7 }, (_, i) => addDays(monday, i)).map(
      renderDay,
    )
  }

  const handleWeekChange = (offset: number) => {
    const changeBy = isMobile() ? 1 : 7
    const newWeekReel = offset < 0 ? currentWeekReel - 1 : currentWeekReel + 1

    const newStartDate = addDays(startDate, offset < 0 ? -changeBy : changeBy)

    setCurrentWeekReel(newWeekReel)
    handleFiltersChange({
      startingDate: formatDateYmd(newStartDate),
    })
    setStartDate(newStartDate)
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
      <Flex className="w-full md:mx-0 lg:mx-6">
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
      className="h-10 w-full rounded-3 sm:w-[80px]  md:w-24"
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
