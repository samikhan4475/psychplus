'use client';

import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { addDays, format } from 'date-fns';
import { isMobile } from '@psychplus/utils/client';
import { formatDateYmd, getFirstDayOfWeek, parseDateString } from '@psychplus/utils/time';
import { LeftArrowIcon, RightArrowIcon } from '@/components';
import { useStore } from '../../store';


const WeekCalendarRow = () => {
  const daysToAdd = isMobile() ? 1 : 7

  const { handleFiltersChange, filters, currentWeekReel, setCurrentWeekReel } =
    useStore()

  const [startDate, setStartDate] = useState(
    filters.startingDate
      ? parseDateString(filters.startingDate)
      : getFirstDayOfWeek(),
  )

  useEffect(() => {
    if (isMobile() && filters.startingDate) {
      handleWeekChange(0, true, filters.startingDate)
    }
  }, [filters.startingDate])

  const getVisibleDates = () => {
    if (isMobile()) {
      const today = new Date()
      const weekStart = getFirstDayOfWeek()
      const weekEnd = addDays(weekStart, 6)

      const isTodayInDefaultWeek = today >= weekStart && today <= weekEnd
      return [currentWeekReel === 0 && isTodayInDefaultWeek ? today : startDate]
    }

    const monday = getFirstDayOfWeek(startDate)
    return Array.from({ length: 7 }, (_, i) => addDays(monday, i))
  }

  const renderDays = () => getVisibleDates().map(renderDay)


  const handleWeekChange = (
    offset: number,
    isDateInFuture?: boolean,
    futureDateFromFilters?: string,
  ) => {
    const changeBy = isMobile() ? 1 : 7
    let newStartDate: Date
    let newWeekReel: number

    if (isMobile() && isDateInFuture && futureDateFromFilters) {
      newStartDate = new Date(futureDateFromFilters)

      const daysDiff = Math.floor(
        (newStartDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      )
      newWeekReel = currentWeekReel + Math.ceil(daysDiff / changeBy)
    } else {
      newStartDate = addDays(startDate, offset < 0 ? -changeBy : changeBy)
      newWeekReel = offset < 0 ? currentWeekReel - 1 : currentWeekReel + 1
    }

    setCurrentWeekReel(newWeekReel)
    handleFiltersChange({
      startingDate: formatDateYmd(newStartDate),
    })
    setStartDate(newStartDate)
  }

  const todayStr = format(new Date(), 'yyyy-MM-dd')
  const isTodayInView = getVisibleDates().some(
    (date) => format(date, 'yyyy-MM-dd') === todayStr,
  )


  return (
    <Flex align="center" className="w-full">
      <Flex
        onClick={() => {
          if (!isTodayInView) {
            handleWeekChange(-daysToAdd)
          }
        }}
        className={
          !isTodayInView
            ? 'cursor-pointer'
            : 'cursor-not-allowed opacity-50'
        }
      >
        <LeftArrowIcon />
      </Flex>
      <Flex className="mx-3 w-full whitespace-nowrap md:mx-0 lg:mx-6">
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