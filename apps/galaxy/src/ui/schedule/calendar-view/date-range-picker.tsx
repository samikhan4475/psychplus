import { getLocalTimeZone, startOfWeek, today } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import {
  Calendar as CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DatePicker,
  DatePickerProps,
  Dialog,
  FieldError,
  Group,
  Heading,
  Popover,
  Text,
  type DateValue,
  type ValidationResult,
} from 'react-aria-components'
import { getSlashedDateString } from '@/utils'
import { START_OF_WEEK_LOCALE } from '../constants'

interface MyDateRangePickerProps<T extends DateValue>
  extends DatePickerProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

function DateRangePickerInput<T extends DateValue>({
  description,
  errorMessage,
  ...props
}: MyDateRangePickerProps<T>) {
  const weekStartDate = props.value
    ? startOfWeek(props.value, START_OF_WEEK_LOCALE)
    : startOfWeek(today(getLocalTimeZone()), START_OF_WEEK_LOCALE)

  return (
    <DatePicker
      {...props}
      shouldCloseOnSelect={false}
      aria-label="date range for calendar view"
    >
      <Group
        className={
          'border-pp-gray-2 relative h-6 flex w-full items-center rounded-1 border data-[disabled]:pointer-events-none data-[disabled]:bg-gray-3 data-[disabled]:text-gray-11'
        }
      >
        <span className="w-max whitespace-nowrap px-1 text-[13px]">
          {getSlashedDateString(weekStartDate)}
        </span>
        <span className="text-[12px]" aria-hidden="true">
          –
        </span>
        <span className="w-max whitespace-nowrap px-1 text-[13px]">
          {getSlashedDateString(weekStartDate.add({ days: 6 }))}
        </span>
        <Button
          className={
            'bg-white flex items-center rounded-1 pr-[3px] outline-none disabled:bg-gray-3 disabled:text-gray-11 ml-1'
          }
        >
          <CalendarIcon size={16} className="stroke-pp-gray-3" />
        </Button>
      </Group>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="bg-white pointer-events-auto rounded-[6px] p-3 shadow-[0px_7px_29px_rgba(100,100,111,0.2)]">
        <Dialog>
          <Calendar className='calendar-grid-container'>
            <Flex justify="between" className="mb-2" align="center">
              <Button
                slot="previous"
                className={
                  'text-base hover:text-black m-0 flex h-[1.5em] w-[1.5em] items-center justify-center rounded-1 text-slate-10 hover:border-slate-12 data-[disabled]:cursor-not-allowed data-[disabled]:border-gray-3 data-[disabled]:text-gray-6'
                }
              >
                <ChevronLeftIcon className="text-black h-4 w-4" />
              </Button>
              <Heading className="text-[12px]" />
              <Button
                slot="next"
                className={
                  'text-base hover:text-black m-0 flex h-[1.5em] w-[1.5em] items-center justify-center rounded-1 text-slate-10 hover:border-slate-12 data-[disabled]:cursor-not-allowed data-[disabled]:border-gray-3 data-[disabled]:text-gray-6'
                }
              >
                <ChevronRightIcon className="text-black h-4 w-4" />
              </Button>{' '}
            </Flex>
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
  )
}

export { DateRangePickerInput }
