'use client'

import { CalendarDate } from '@internationalized/date'
import { Box, Text } from '@radix-ui/themes'
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
  DateInput,
  DatePicker,
  DatePickerProps,
  DateSegment,
  DateValue,
  Dialog,
  Group,
  Heading,
  Popover,
} from 'react-aria-components'
import { Controller, useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError } from '@/components/form'
import { cn } from '@/utils'

interface DatePickerInputProps<T extends DateValue> extends DatePickerProps<T> {
  label?: string
  field: string
  isRequired?: boolean
  aria_lable?: string
  isDisabled?: boolean
  className?: string
  datePickerClass?: string
  dateInputClass?: string
  handleChange?: (date: CalendarDate) => void
}

const DatePickerInput = <T extends DateValue>({
  label,
  isRequired,
  field,
  aria_lable,
  isDisabled,
  className,
  datePickerClass,
  dateInputClass,
  handleChange,
  ...props
}: DatePickerInputProps<T>) => {
  const form = useFormContext()

  return (
    <FormFieldContainer className={cn('w-full gap-0.5', className)}>
      {label && (
        <Text as="label" size="1" weight="medium">
          {label}
        </Text>
      )}
      <Controller
        control={form.control}
        name={field}
        rules={isRequired ? { required: 'Required' } : undefined}
        render={({
          field: { name, value, onChange, onBlur },
          fieldState: { invalid },
        }) => (
          <DatePicker
            name={name}
            value={value ?? null} // Ensure it handles null or undefined
            onChange={(date) => {
              onChange(date)
              handleChange?.(date as CalendarDate)
            }}
            onBlur={onBlur}
            isRequired
            validationBehavior="aria"
            aria-label={aria_lable ?? 'date to filter input'}
            isInvalid={invalid}
            className={datePickerClass}
            isDisabled={form.formState.disabled || isDisabled}
            {...props}
          >
            <Group
              className={cn(
                'relative w-full',
                isDisabled ? 'bg-gray-3 text-gray-11' : 'bg-[white]',
              )}
            >
              <DateInput
                className={cn(
                  'border-pp-gray-2 flex h-6 w-full items-center overflow-hidden whitespace-nowrap rounded-1 border px-1 py-[2.5px] data-[focus-within]:outline-1 data-[focus-within]:outline-iris-12',
                  {
                    'bg-gray-3': form.formState.disabled || isDisabled,
                  },
                  dateInputClass,
                )}
              >
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
              <Button
                className={
                  'bg-white absolute bottom-[1px] right-[1px] top-[1px] flex items-center rounded-1 pr-[3px] outline-none disabled:bg-gray-3 disabled:text-gray-11'
                }
              >
                <CalendarIcon size={16} className="stroke-pp-gray-3" />
              </Button>
            </Group>
            <Popover className="bg-white pointer-events-auto rounded-1 p-3 shadow-[0px_7px_29px_rgba(100,100,111,0.2)]">
              <Dialog>
                <Calendar>
                  <Box className="mx-[0.5rem] mb-1 flex justify-between">
                    <Button
                      slot="previous"
                      className={
                        'text-base hover:text-black m-0 flex h-[1.5em] w-[1.5em] items-center justify-center rounded-1 border border-solid border-slate-6 text-slate-10 hover:border-slate-12 '
                      }
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Heading className="flex-1 text-center text-[14px] font-medium" />
                    <Button
                      slot="next"
                      className={
                        'text-base hover:text-black m-0 flex h-[1.5em] w-[1.5em] items-center justify-center rounded-1 border border-solid border-slate-6 text-slate-10 hover:border-slate-12 '
                      }
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </Box>
                  <CalendarGrid className="[&__.react-aria-CalendarHeaderCell]:text-[13px] [&__.react-aria-CalendarHeaderCell]:font-medium">
                    {(date) => (
                      <CalendarCell
                        date={date}
                        className={
                          'data-[selected]:text-white data-[outside-month]:opacity-35 m-px w-[2em] cursor-pointer rounded-[6px] text-center text-[13px] leading-[2em] outline-none hover:bg-iris-6 data-[outside-month]:!cursor-default data-[outside-month]:!bg-transparent data-[selected]:!bg-iris-12'
                        }
                      />
                    )}
                  </CalendarGrid>
                </Calendar>
              </Dialog>
            </Popover>
          </DatePicker>
        )}
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { DatePickerInput }
