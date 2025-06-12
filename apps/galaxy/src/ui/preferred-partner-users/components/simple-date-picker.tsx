'use client'

import { CalendarDate } from '@internationalized/date'
import { Box } from '@radix-ui/themes'
import {
  Calendar as CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DatePickerProps,
  DateSegment,
  DateValue,
  Dialog,
  Group,
  Heading,
  I18nProvider,
  Popover,
} from 'react-aria-components'
import { cn } from '@/utils'

interface SimpleDatePickerProps<T extends DateValue> extends DatePickerProps<T> {
  dateInputClass?: string
  className?: string
  handleChange?: (date: CalendarDate | null) => void
  yearFormat?: 'YY' | 'YYYY'
  onBlur?: () => void
}

const SimpleDatePicker = <T extends DateValue>({
  dateInputClass,
  className,
  handleChange,
  yearFormat = 'YY',
  onBlur,
  ...props
}: SimpleDatePickerProps<T>) => {
  const [internalValue, setInternalValue] = useState<DateValue | null>(props.value ?? null)

  useEffect(() => {
    if (props.value !== internalValue) {
      setInternalValue(props.value ?? null)
    }
  }, [props.value])

  const handleDateChange = (date: DateValue | null) => {
    setInternalValue(date)
    
  }

  const handleDateBlur = () => {
    onBlur?.()
    
    if (yearFormat === 'YY') {
      if (!internalValue || !(internalValue instanceof CalendarDate)) {
        handleChange?.(null)
        return
      }
      const num = internalValue.year % 100
      const currentYear = new Date().getFullYear()
      const century = Math.floor(currentYear / 100) * 100

      const updatedDate = new CalendarDate(
        century + num,
        internalValue.month,
        internalValue.day,
      )

      handleChange?.(updatedDate as CalendarDate)
    } else {
      handleChange?.(internalValue as CalendarDate | null)
    }
  }

  return (
    <I18nProvider locale="en-US">
      <Box className={cn('w-full', className)}>
        <DatePicker
          {...props}
          value={internalValue as T | null}
          aria-label="date input"
          onBlur={handleDateBlur}
          onChange={handleDateChange}
        >
          <Group className="border-pp-gray-2 relative w-full rounded-1 border data-[disabled]:pointer-events-none data-[disabled]:bg-gray-3 data-[disabled]:text-gray-11 data-[focus-within]:outline-1 data-[focus-within]:outline-iris-12">
            <DateInput
              className={cn(
                'flex h-6 w-full items-center overflow-hidden whitespace-nowrap px-1 py-[2.5px]',
                dateInputClass,
              )}
            >
              {(segment) => (
                <DateSegment segment={segment}>
                  {({ text, placeholder, isPlaceholder, type }) => (
                    <>
                      {isPlaceholder ? (
                        <span
                          style={{
                            visibility: isPlaceholder ? 'visible' : 'hidden',
                          }}
                        >
                          {yearFormat === 'YY' && type === 'year'
                            ? placeholder.slice(-2)
                            : placeholder}
                        </span>
                      ) : (
                        <p>
                          {yearFormat === 'YY' && type === 'year'
                            ? text.slice(-2)
                            : text}
                        </p>
                      )}
                    </>
                  )}
                </DateSegment>
              )}
            </DateInput>
            <Button
              className="bg-white absolute right-0 top-0 flex h-full items-center rounded-r-1 pr-1 outline-none disabled:bg-gray-3 disabled:text-gray-11"
            >
              <CalendarIcon size={12} className="stroke-pp-gray-3" />
            </Button>
          </Group>
          <Popover className="bg-white pointer-events-auto rounded-[6px] p-3 shadow-[0px_7px_29px_rgba(100,100,111,0.2)]">
            <Dialog>
              <Calendar>
                <header className="mb-2 flex items-center justify-between">
                  <Button
                    slot="previous"
                    className="text-base hover:text-black m-0 flex h-[1.5em] w-[1.5em] items-center justify-center rounded-1 text-slate-10 hover:border-slate-12 data-[disabled]:cursor-not-allowed data-[disabled]:border-gray-3 data-[disabled]:text-gray-6"
                  >
                    <ChevronLeftIcon className="text-black h-4 w-4" />
                  </Button>
                  <Heading className="text-[12px]" />
                  <Button
                    slot="next"
                    className="text-base hover:text-black m-0 flex h-[1.5em] w-[1.5em] items-center justify-center rounded-1 text-slate-10 hover:border-slate-12 data-[disabled]:cursor-not-allowed data-[disabled]:border-gray-3 data-[disabled]:text-gray-6"
                  >
                    <ChevronRightIcon className="text-black h-4 w-4" />
                  </Button>
                </header>
                <CalendarGrid className="[&__.react-aria-CalendarHeaderCell]:text-[13px] [&__.react-aria-CalendarHeaderCell]:font-medium">
                  {(date) => (
                    <CalendarCell
                      className="data-[selected]:text-white [&[aria-label*='Today']]:bg-pp-focus-bg data-[disabled]:text-pp-icon-soft data-[selected]:!bg-pp-blue-400 m-px w-[2em] cursor-pointer rounded-[6px] text-center text-[13px] leading-[2em] outline-none hover:!bg-iris-6 data-[disabled]:cursor-not-allowed data-[outside-month]:!cursor-default data-[disabled]:!bg-transparent data-[outside-month]:!bg-transparent data-[outside-month]:opacity-80"
                      date={date}
                    />
                  )}
                </CalendarGrid>
              </Calendar>
            </Dialog>
          </Popover>
        </DatePicker>
      </Box>
    </I18nProvider>
  )
}

export { SimpleDatePicker }
