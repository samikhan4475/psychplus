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
  placeholder?: string
  color?:
    | 'ruby'
    | 'tomato'
    | 'red'
    | 'crimson'
    | 'pink'
    | 'plum'
    | 'purple'
    | 'violet'
    | 'iris'
    | 'indigo'
    | 'blue'
    | 'cyan'
    | 'teal'
    | 'jade'
    | 'green'
    | 'grass'
    | 'brown'
    | 'orange'
    | 'sky'
    | 'mint'
    | 'lime'
    | 'yellow'
    | 'amber'
    | 'gold'
    | 'bronze'
    | 'gray'
  onSelect: (date?: Date) => void
}

const IconAndDate = (
  reverse: boolean | undefined,
  date: Date | undefined,
  placeholder?: string,
) => {
  if (reverse) {
    return (
      <>
        {date ? (
          format(date, 'PPP')
        ) : (
          <span>{placeholder || 'MM/DD/YYYY'}</span>
        )}
        <CalendarIcon className="mr-1 h-5 w-5" />
      </>
    )
  }
  return (
    <>
      <CalendarIcon className="mr-1 h-5 w-5" />
      {date ? format(date, 'PPP') : <span>{placeholder || 'Pick a date'}</span>}
    </>
  )
}

const DatePicker = ({
  date,
  reverse,
  buttonClassName,
  onSelect,
  placeholder,
  color,
}: DatePickerProps) => (
  <Popover.Root>
    <Popover.Trigger>
      <Button
        color={color || undefined}
        variant="outline"
        className={
          buttonClassName ?? 'w-[200px] justify-start text-left font-regular'
        }
      >
        {IconAndDate(reverse, date, placeholder)}
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
