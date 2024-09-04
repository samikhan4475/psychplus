'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { Button } from './button'
import { Calendar } from './calendar'
import { cn } from './cn'
import { Popover } from './popover'

interface DatePickerProps {
  date?: Date
  reverse?: boolean
  buttonClassName?: string
  placeholder?: string
  calendarClassName?: string
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
  dateFormat?: string
  onSelect: (date?: Date) => void
  disabled?: boolean
}

const placeholderStyles = 'font-[400] text-xs text-[#8B8D98]'

const IconAndDate = (
  reverse: boolean | undefined,
  date: Date | undefined,
  dateFormat: string | undefined,
  placeholder?: string,
  calendarClassName?: string,
) => {
  if (reverse) {
    return (
      <>
        {date ? (
          format(date, dateFormat ?? 'PPP')
        ) : (
          <span className={placeholderStyles}>
            {placeholder || 'MM/DD/YYYY'}
          </span>
        )}
        <CalendarIcon className={cn('mr-1 h-5 w-5', calendarClassName)} />
      </>
    )
  }
  return (
    <>
      <CalendarIcon className="mr-1 h-5 w-5" />
      {date ? (
        format(date, 'PPP')
      ) : (
        <span className={placeholderStyles}>
          {placeholder || 'Pick a date'}
        </span>
      )}
    </>
  )
}

const DatePicker = ({
  date,
  reverse,
  buttonClassName,
  calendarClassName,
  onSelect,
  placeholder,
  color,
  dateFormat,
  disabled,
}: DatePickerProps) => (
  <Popover.Root>
    <Popover.Trigger>
      <Button
        disabled={disabled}
        color={color || undefined}
        variant="outline"
        className={
          buttonClassName ?? 'w-[200px] justify-start text-left font-regular'
        }
      >
        {IconAndDate(reverse, date, dateFormat, placeholder, calendarClassName)}
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
