import { Box, Flex, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useWatch } from 'react-hook-form'
import { InfoIcon } from '@/components/icons'
import { useStore } from '../store'
import { INTERVAL } from '../types'
import { monthOptions, weekdayOptions } from './constants'

const DataDetail = () => {
  const { selectedTemplate } = useStore()

  const [
    beginOn,
    repeatInterval,
    hourSelection,
    minuteSelection,
    monthSelection,
    weekdaysSelection,
    monthDateSelection,
  ] = useWatch({
    name: [
      'beginOn',
      'repeatInterval',
      'hourSelection',
      'minuteSelection',
      'monthSelection',
      'weekdaysSelection',
      'monthDateSelection',
    ],
  })

  const formattedBeginOn = beginOn
    ? format(
        new Date(beginOn.year, beginOn.month - 1, beginOn.day),
        'MM/dd/yyyy',
      )
    : ''

  const formatTime = () => {
    if (repeatInterval === INTERVAL.MINUTE) return 'every minute'
    if (repeatInterval === INTERVAL.HOUR) {
      return `at minute ${minuteSelection?.join(', ') || 'every minute'}`
    }

    const hours = hourSelection || []
    const minutes = minuteSelection || []

    if (!hours.length) return 'at every hour'
    if (!minutes.length) {
      const formattedHours = hours.map((hour: string) => `${hour}:00`).join(', ')
      return `at ${formattedHours}`
    }

    const timeCombinations = hours.flatMap((hour: string) =>
      minutes.map((minute: string) => `${hour}:${minute.padStart(2, '0')}`),
    )

    return `at ${timeCombinations.join(', ')}`
  }

  const getWeekdayNames = (weekdayNumbers: string[]) => {
    if (!weekdayNumbers?.length) return 'every day'
    return weekdayNumbers
      .map(
        (num) => weekdayOptions.find((option) => option.value === num)?.label,
      )
      .filter(Boolean)
      .join(', ')
  }

  const getMonthNames = (monthNumbers: string[]) => {
    if (!monthNumbers?.length) return 'every month'
    return monthNumbers
      .map((num) => monthOptions.find((option) => option.value === num)?.label)
      .filter(Boolean)
      .join(', ')
  }

  const formatScheduleDetails = () => {
    const timeStr = formatTime()

    switch (repeatInterval) {
      case INTERVAL.YEAR:
        return `every year in ${getMonthNames(monthSelection)} on ${
          monthDateSelection?.join(', ') || 'every day'
        } ${timeStr}`

      case INTERVAL.MONTH:
        return `every month on ${
          monthDateSelection?.join(', ') || 'every day'
        } ${timeStr}`

      case INTERVAL.WEEK:
        return `every week on ${getWeekdayNames(weekdaysSelection)} ${timeStr}`

      case INTERVAL.DAY:
        return `every day ${timeStr}`

      case INTERVAL.HOUR:
        return `every hour at minute ${
          minuteSelection?.join(', ') || 'every minute'
        }`

      case INTERVAL.MINUTE:
        return 'every minute'

      default:
        return 'No schedule details'
    }
  }

  return (
    <Flex
      className="bg-pp-bg-accent mb-2 mt-3 flex flex-row gap-1.5 rounded-[4px] px-2 py-1.5 "
      align="center"
    >
      <Box className="w-[30px]">
        <InfoIcon />
      </Box>
      <Text className="text-pp-black-3 my-1" size="1">
        You have scheduled the {selectedTemplate?.displayName ?? ''} report to
        start on {formattedBeginOn}, {formatScheduleDetails()}
      </Text>
    </Flex>
  )
}

export { DataDetail }
