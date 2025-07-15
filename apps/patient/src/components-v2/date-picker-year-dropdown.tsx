import { useEffect, useMemo, useRef, useState } from 'react'
import { CalendarDate } from '@internationalized/date'
import * as Popover from '@radix-ui/react-popover'
import { Box } from '@radix-ui/themes'
import { ChevronDown } from 'lucide-react'
import { DateValue, Heading } from 'react-aria-components'
import { generateCalendarDateToday } from '@/utils'

interface Props {
  focusedValue: CalendarDate
  onFocusedDateChange: (date: CalendarDate) => void
  minValue?: DateValue
  maxValue?: DateValue
}

const DatePickerYearDropdown = ({
  focusedValue,
  onFocusedDateChange,
  maxValue,
  minValue,
}: Props) => {
  const [open, setOpen] = useState(false)
  const activeYearRef = useRef<HTMLDivElement>(null)

  const { activeDate, years } = useMemo(() => {
    const date = focusedValue ?? generateCalendarDateToday()
    const list = Array.from({ length: 61 }, (_, i) => date.year - 30 + i)
    return { activeDate: date, years: list }
  }, [focusedValue])

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (activeYearRef?.current) {
          activeYearRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      }, 0)
    }
  }, [open, activeDate?.year])

  const isDisabled = (year: number) => {
    if (minValue && year < minValue.year) return true
    if (maxValue && year > maxValue.year) return true
    return false
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal={false}>
      <Popover.Trigger>
        <Box className="inline-flex cursor-pointer items-center text-[14px] font-medium">
          <Heading className="inline text-center text-[14px] font-medium" />
          <ChevronDown width={15} height={15} className="ml-1" />
        </Box>
      </Popover.Trigger>
      <Popover.Content
        side="bottom"
        align="start"
        className="rounded bg-white border-pp-gray-2 z-20 max-h-60 overflow-auto border border-solid p-2"
      >
        {years.map((year) => {
          const disabled = isDisabled(year)
          const selected = year === focusedValue.year
          return (
            <Box
              key={year}
              ref={selected ? activeYearRef : undefined}
              className={`
              rounded hover:bg-gray-100 cursor-pointer px-2 py-1
              ${
                selected
                  ? 'text-white rounded-[3px] !bg-iris-12 font-medium'
                  : ''
              }
                 ${
                   disabled
                     ? '!cursor-not-allowed opacity-40'
                     : 'hover:bg-gray-100'
                 }
            `}
              onClick={
                !disabled
                  ? () => {
                      onFocusedDateChange(
                        new CalendarDate(
                          year,
                          focusedValue.month,
                          focusedValue.day,
                        ),
                      )
                      setOpen(false)
                    }
                  : undefined
              }
            >
              {year}
            </Box>
          )
        })}
        <Popover.Arrow className="fill-white" width={10} height={5} />
      </Popover.Content>
    </Popover.Root>
  )
}
export { DatePickerYearDropdown }
