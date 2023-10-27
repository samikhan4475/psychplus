'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { type DateRange } from 'react-day-picker'
import { Button } from '@psychplus/ui/button'
import { Calendar } from '@psychplus/ui/calendar'
import { Popover } from '@psychplus/ui/popover'

const getDateLabel = (date?: DateRange) => {
  if (date?.from && date?.to) {
    return `${format(date.from, 'LLL dd, y')} - ${format(date.to, 'LLL dd, y')}`
  }

  if (date?.from) {
    return format(date.from, 'LLL dd, y')
  }

  return <span>Pick a date</span>
}

const DateRangePicker = ({
  date,
  onSelect,
}: {
  date?: DateRange
  onSelect: (date?: DateRange) => void
}) => (
  <div className="grid gap-2">
    <Popover.Root>
      <Popover.Trigger>
        <Button
          id="date"
          variant="outline"
          className="w-[300px] justify-start text-left font-regular"
        >
          <CalendarIcon className="mr-2 h-5 w-5" />
          {getDateLabel(date)}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={onSelect}
          numberOfMonths={2}
        />
      </Popover.Content>
    </Popover.Root>
  </div>
)

export { DateRangePicker }
