'use client'

import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { DayPicker } from 'react-day-picker'
import { cn } from '@psychplus/ui/cn'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    className={cn('p-3', className)}
    classNames={{
      months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
      month: 'space-y-4',
      caption: 'flex justify-center pt-1 relative items-center',
      caption_label: 'text-3 font-medium',
      nav: 'space-x-1 flex items-center',
      nav_button:
        'h-7 w-7 bg-transparent border border-gray-6 flex items-center justify-center rounded-item transition ease-in-out hover:bg-gray-2 opacity-50 hover:opacity-100',
      nav_button_previous: 'absolute left-1',
      nav_button_next: 'absolute right-1',
      table: 'w-full border-collapse space-y-1',
      head_row: 'flex',
      head_cell: 'text-gray-12 w-8 font-regular text-[0.8rem]',
      row: 'flex w-full mt-2',
      day: 'flex items-center justify-center w-8 h-8 cursor-pointer [&:not([aria-selected])]:hover:bg-accent-3 [&:not([aria-selected])]:rounded-2',
      day_selected: '!text-accent-9-contrast bg-accent-9',
      day_today: 'font-bold bg-gray-4',
      day_outside:
        '[&:not([aria-selected])]:text-gray-11 [&:not([aria-selected])]:opacity-50',
      day_disabled: 'text-gray-11 opacity-50',
      day_range_middle: 'rounded-[0] !bg-accent-5 !text-gray-12',
      day_hidden: 'invisible',
      cell: cn(
        'text-2 h-8 w-8 p-0 overflow-hidden',
        props.mode === 'range'
          ? '[&:has(>.day-range-end)]:rounded-r-2 [&:has(>.day-range-start)]:rounded-l-2 first:[&:has([aria-selected])]:rounded-l-2 last:[&:has([aria-selected])]:rounded-r-2'
          : '[&:has([aria-selected])]:rounded-2',
      ),
      day_range_start: 'day-range-start',
      day_range_end: 'day-range-end',
      ...classNames,
    }}
    components={{
      IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
      IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
    }}
    {...props}
  />
)

Calendar.displayName = 'Calendar'

export { Calendar }
