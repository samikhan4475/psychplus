'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { Button } from './button'
import { Calendar } from './calendar'
import { Popover } from './popover'

interface DatePickerProps {
  date?: Date
  reverse?: boolean
  buttonClassName?: string
  onSelect: (date?: Date) => void
}

const IconAndDate = (reverse: boolean | undefined, date: Date | undefined) => {
  if (reverse) {
    return (
      <>
        {date ? format(date, 'PPP') : <span>MM/DD/YYYY</span>}
        <CalendarIcon className="mr-1 h-5 w-5" />
      </>
    )
  }
  return (
    <>
      <CalendarIcon className="mr-1 h-5 w-5" />
      {date ? format(date, 'PPP') : <span>Pick a date</span>}
    </>
  )
}

const DatePicker = ({
  date,
  reverse,
  buttonClassName,
  onSelect,
}: DatePickerProps) => (
  <Popover.Root>
    <Popover.Trigger>
      <Button
        variant="outline"
        className={
          buttonClassName ?? 'w-[200px] justify-start text-left font-regular'
        }
      >
        {IconAndDate(reverse, date)}
      </Button>
    </Popover.Trigger>
    <Popover.Content className="w-auto p-0">
      <Calendar
        mode="single"
        selected={date}
        onSelect={onSelect}
        initialFocus
      />
    </Popover.Content>
  </Popover.Root>
)

export { DatePicker }
