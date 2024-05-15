import { getLocalTimeZone, isToday, today } from '@internationalized/date'
import {
  cn,
  getCalendarDate,
  getDayOfWeekLabel,
  getMonthLabel,
} from '@psychplus-v2/utils'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  type LucideIcon,
} from 'lucide-react'
import { useStore } from '@/features/appointments/search/store'
import { generateDateRange } from '@/features/appointments/search/utils'

const DaysHeader = () => {
  const { startingDate, prev, next } = useStore((state) => ({
    startingDate: state.startingDate,
    next: state.next,
    prev: state.prev,
  }))

  const todaysDate = today(getLocalTimeZone())
  const searchStartDate = getCalendarDate(startingDate)
  const isPastDate =
    isToday(searchStartDate, getLocalTimeZone()) ||
    searchStartDate.compare(todaysDate) < 0

  const dateRange = generateDateRange(getCalendarDate(startingDate))

  return (
    <Flex align="center" className="flex-1">
      <PaginationIcon
        Icon={ChevronLeftIcon}
        onClick={prev}
        disabled={isPastDate}
      />
      <Flex className="flex-1">
        {dateRange.map((date) => (
          <Flex
            key={date.toString()}
            align="end"
            justify="center"
            gap="1"
            className="flex-1"
          >
            {isToday(date, getLocalTimeZone()) ? (
              <Text className="text-[14px]">Today</Text>
            ) : (
              <>
                <Text className="text-[13px] text-gray-11">
                  {getDayOfWeekLabel(date).slice(0, 3)}
                </Text>
                <Flex gap="1" className="-mb-[1px] text-[15px]">
                  <Text>{getMonthLabel(date).slice(0, 3)}</Text>
                  <Text>{date.day}</Text>
                </Flex>
              </>
            )}
          </Flex>
        ))}
      </Flex>
      <PaginationIcon Icon={ChevronRightIcon} onClick={next} />
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

export { DaysHeader }
