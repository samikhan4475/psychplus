import { useStore } from '@/features/appointments/search/store'
import { generateDateRange } from '@/features/appointments/search/utils'
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
    <Flex align="end" className="flex-1">
      <PaginationIcon
        Icon={ChevronLeftIcon}
        onClick={prev}
        disabled={isPastDate}
      />
      <Flex className="flex-1 w-[calc(100vw-113px)] overflow-x-scroll sm:w-auto sm:overflow-x-hidden" gap="2">
        {dateRange.map((date) => (
          <Flex
            key={date.toString()}
            align="end"
            className="flex-1"
            justify="center"
          >
            <Flex direction='column'>
              <Text className="text-[12px] font-medium text-[#194595]" hidden={!isToday(date, getLocalTimeZone())}>
                Today
              </Text>
              <Flex gap='1' align='baseline'>
                <Text className="text-[13px] text-gray-11">
                  {getDayOfWeekLabel(date).slice(0, 3)}
                </Text>
                <Text className="text-[#151B4A]">
                  {getMonthLabel(date).slice(0, 3)}
                  {date.day}
                </Text>
              </Flex>
            </Flex>
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
