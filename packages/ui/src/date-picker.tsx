'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { Button } from './button'
import { Calendar } from './calendar'
import { Popover } from './popover'

const DatePicker = ({
  date,
  onSelect,
}: {
  date?: Date
  onSelect: (date?: Date) => void
}) => (
  <Popover.Root>
    <Popover.Trigger>
      <Button
        variant="outline"
        className="w-[200px] justify-start text-left font-regular"
      >
        <CalendarIcon className="mr-1 h-5 w-5" />
        {date ? format(date, 'PPP') : <span>Pick a date</span>}
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
