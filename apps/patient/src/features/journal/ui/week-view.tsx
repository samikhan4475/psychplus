import { generateDateRange } from '@/features/appointments/search/utils'
import { getLocalTimeZone, isToday, today, type CalendarDate } from '@internationalized/date'
import {
  cn,
  getCalendarDate,
  getCalendarDateLabel,
  getDayOfWeekLabel,
  getMonthLabel,
} from '@psychplus-v2/utils'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'
import { useStore } from '../store'

const WeekView = () => {
  const { startingDate, selectedDate, prev, next, setSelectedDate } = useStore((state) => ({
    startingDate: state.startingDate,
    selectedDate: state.selectedDate,
    next: state.next,
    prev: state.prev,
    setSelectedDate: state.setSelectedDate,
  }))

  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const todaysDate = today(getLocalTimeZone())
  const searchStartDate = getCalendarDate(startingDate)
  const selectedCalendarDate = useMemo(() => getCalendarDate(selectedDate), [selectedDate])

  const nextWeekDate = searchStartDate.add({ days: 7 })
  const isNextWeekInFuture = nextWeekDate.compare(todaysDate) > 0

  const ninetyDaysAgo = todaysDate.subtract({ days: 90 })
  const isPrevWeekInPast = searchStartDate.compare(ninetyDaysAgo) < 0

  const dateRange = useMemo(() => generateDateRange(getCalendarDate(startingDate)), [startingDate])

  // Simple mobile navigation - work with selected date directly
  const handleMobilePrev = () => {
    const currentDate = getCalendarDate(selectedDate)
    const prevDate = currentDate.subtract({ days: 1 })
    
    // Only allow if not past 90 days
    if (prevDate.compare(ninetyDaysAgo) >= 0) {
      setSelectedDate(getCalendarDateLabel(prevDate))
    }
  }

  const handleMobileNext = () => {
    const currentDate = getCalendarDate(selectedDate)
    const nextDate = currentDate.add({ days: 1 })
    
    // Only allow if not future
    if (nextDate.compare(todaysDate) <= 0) {
      setSelectedDate(getCalendarDateLabel(nextDate))
    }
  }

  // Check if prev/next buttons should be disabled for mobile
  const isMobilePrevDisabled = getCalendarDate(selectedDate).subtract({ days: 1 }).compare(ninetyDaysAgo) < 0
  const isMobileNextDisabled = getCalendarDate(selectedDate).add({ days: 1 }).compare(todaysDate) > 0

  const handleDateClick = (date: CalendarDate) => {
    if (date.compare(todaysDate) > 0 || date.compare(ninetyDaysAgo) < 0) {
      return
    }
    setSelectedDate(getCalendarDateLabel(date))
  }

  return (
    <Flex align="center" className="flex-1 sm:border-b sm:border-b-pp-gray-2 px-2 rounded-4 bg-pp-blue-2 sm:rounded-none sm:bg-transparent">
      {isMobile ? (
        <>
          <PaginationIcon
            Icon={ChevronLeftIcon}
            onClick={handleMobilePrev}
            disabled={isMobilePrevDisabled}
          />
          <Flex className="flex-1 justify-center">
            {(() => {
              const date = selectedCalendarDate
              const isFuture = date.compare(todaysDate) > 0
              const isPast90Days = date.compare(ninetyDaysAgo) < 0

              return (
                <Flex
                  align="end"
                  className={cn("cursor-pointer justify-center transition-colors pt-5", {
                    "opacity-50 cursor-not-allowed": isFuture || isPast90Days,
                  })}
                  onClick={() => handleDateClick(date)}
                >
                  {isToday(date, getLocalTimeZone()) ? (
                    <Flex gap="1" align="baseline" className={cn("pb-3")}>
                      <Text className="absolute -mt-[16px] text-[12px] font-medium text-[#194595]">
                        Today
                      </Text>
                      <Text className="text-[13px] text-gray-11">
                        {getDayOfWeekLabel(date).slice(0, 3)}
                      </Text>
                      <Text className={cn("text-[#151B4A]")}>
                        {getMonthLabel(date).slice(0, 3)}
                        {date.day}
                      </Text>
                    </Flex>
                  ) : (
                    <Flex gap="1" align="baseline" className={cn("pb-4"
                    )}>
                      <Text className="text-[13px] text-gray-11">
                        {getDayOfWeekLabel(date).slice(0, 3)}
                      </Text>
                      <Text className={cn("text-[#151B4A]")}>
                        {getMonthLabel(date).slice(0, 3)}
                        {date.day}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              )
            })()}
          </Flex>
          <PaginationIcon
            Icon={ChevronRightIcon}
            onClick={handleMobileNext}
            disabled={isMobileNextDisabled}
          />
        </>
      ) : (
        <>
          <PaginationIcon
            Icon={ChevronLeftIcon}
            onClick={prev}
            disabled={isPrevWeekInPast}
          />
          <Flex className="flex-1">
            {dateRange.map((date) => {
              const isSelected = date.compare(selectedCalendarDate) === 0
              const isFuture = date.compare(todaysDate) > 0
              const isPast90Days = date.compare(ninetyDaysAgo) < 0

              return (
                <Flex
                  key={date.toString()}
                  align="end"
                  className={cn("flex-1 cursor-pointer justify-center transition-colors pt-5", {
                    "opacity-50 cursor-not-allowed": isFuture || isPast90Days,
                  })}
                  onClick={() => handleDateClick(date)}
                >
                  {isToday(date, getLocalTimeZone()) ? (
                    <Flex gap="1" align="baseline" className={cn("pb-3",
                      isSelected ? "border-b-2 border-[#194595]" : "border-b-2 border-transparent"
                    )}>
                      <Text className="absolute -mt-[16px] text-[12px] font-medium text-[#194595]">
                        Today
                      </Text>
                      <Text className="text-[13px] text-gray-11">
                        {getDayOfWeekLabel(date).slice(0, 3)}
                      </Text>
                      <Text className={cn("text-[#151B4A]")}>
                        {getMonthLabel(date).slice(0, 3)}
                        {date.day}
                      </Text>
                    </Flex>
                  ) : (
                    <Flex gap="1" align="baseline" className={cn("pb-4",
                      isSelected ? "border-b-2 border-[#194595]" : "border-b-2 border-transparent"
                    )}>
                      <Text className="text-[13px] text-gray-11">
                        {getDayOfWeekLabel(date).slice(0, 3)}
                      </Text>
                      <Text className={cn("text-[#151B4A]")}>
                        {getMonthLabel(date).slice(0, 3)}
                        {date.day}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              )
            })}
          </Flex>
          <PaginationIcon
            Icon={ChevronRightIcon}
            onClick={next}
            disabled={isNextWeekInFuture}
          />
        </>
      )}
    </Flex>
  )
}

const PaginationIcon = ({
  Icon,
  onClick,
  disabled,
}: {
  Icon: LucideIcon
  onClick: () => void
  disabled?: boolean
}) => (
  <IconButton
    disabled={disabled}
    onClick={onClick}
    className={cn('bg-transparent text-gray-11 transition-colors', {
      ['hover:bg-gray-3 hover:text-gray-12']: !disabled,
    })}
  >
    <Icon width={24} height={24} strokeWidth={1.5} />
  </IconButton>
)

export { WeekView }
