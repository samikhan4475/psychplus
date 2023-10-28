'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import { Button } from '@psychplus/ui/button'
import { Calendar } from '@psychplus/ui/calendar'
import { Popover } from '@psychplus/ui/popover'
import { Select } from '@psychplus/ui/select'

const DatePickerWithPresets = ({
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
    <Popover.Content className="flex w-auto flex-col space-y-2 p-2">
      <Select.Root
        onValueChange={(value) =>
          onSelect(addDays(new Date(), parseInt(value)))
        }
      >
        <Select.Trigger placeholder="Select" />
        <Select.Content position="popper">
          <Select.Item value="0">Today</Select.Item>
          <Select.Item value="1">Tomorrow</Select.Item>
          <Select.Item value="3">In 3 days</Select.Item>
          <Select.Item value="7">In a week</Select.Item>
        </Select.Content>
      </Select.Root>
      <Calendar
        mode="single"
        selected={date}
        onSelect={onSelect}
        className="p-1"
      />
    </Popover.Content>
  </Popover.Root>
)

export { DatePickerWithPresets }
