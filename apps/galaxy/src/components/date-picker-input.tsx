'use client'

import { useState } from 'react'
import { CalendarDate } from '@internationalized/date'
import { Box, Flex, Text } from '@radix-ui/themes'
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
  I18nProvider,
  Popover,
} from 'react-aria-components'
import { Controller, useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError } from '@/components/form'
import { cn, getLocalCalendarDate } from '@/utils'
import { DatePickerYearSelector } from './date-picker-year-selector'

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
  showError?: boolean
  yearFormat?: 'YY' | 'YYYY'
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
  showError = true,
  yearFormat = 'YY',
  ...props
}: DatePickerInputProps<T>) => {
  const form = useFormContext()

  const [focusedDate, setFocusedDate] = useState<CalendarDate>(
    getLocalCalendarDate(),
  )
  return (
    <I18nProvider locale="en-US">
      <FormFieldContainer className={cn('w-full gap-0.5', className)}>
        <Flex>
          {label && (
            <Text as="label" size="1" weight="medium">
              {label}
            </Text>
          )}
          {isRequired && (
            <Text className="ml-[2px] text-[11px] text-red-9">*</Text>
          )}
        </Flex>
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
              value={value ?? null}
              onOpenChange={(open) => {
                if (!open || !value) return
                setFocusedDate(value)
              }}
              // Ensure it handles null or undefined
              onChange={(date) => {
                if (yearFormat === 'YY') {
                  if (!date || !(date instanceof CalendarDate)) return null
                  const num = date.year % 100 // Extract last two digits
                  const currentYear = new Date().getFullYear()

                  const century =
                    date.year >= 1800 && date.year < 2000
                      ? Math.floor(date.year / 100) * 100
                      : Math.floor(currentYear / 100) * 100

                  const updatedDate = new CalendarDate(
                    century + num,
                    date.month,
                    date.day,
                  )

                  onChange(updatedDate)
                  handleChange?.(updatedDate as CalendarDate)
                } else {
                  onChange(date)
                  handleChange?.(date as CalendarDate)
                }
              }}
              onBlur={onBlur}
              isRequired
              validationBehavior="aria"
              aria-label={aria_lable ?? 'date to filter input'}
              isInvalid={invalid}
              className={datePickerClass}
              isDisabled={
                form.formState.disabled ||
                form.formState.isSubmitting ||
                isDisabled
              }
              {...props}
            >
              <Group
                className={
                  'relative w-full data-[disabled]:pointer-events-none data-[disabled]:bg-gray-3 data-[disabled]:text-gray-11'
                }
              >
                <DateInput
                  className={cn(
                    'border-pp-gray-2 flex h-6 w-full items-center overflow-hidden whitespace-nowrap rounded-1 border px-1 py-[2.5px]   data-[focus-within]:outline-1 data-[focus-within]:outline-iris-12',
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
                                visibility: isPlaceholder
                                  ? 'visible'
                                  : 'hidden',
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
                  className={
                    'bg-white absolute bottom-[1px] right-[1px] top-[1px] flex items-center rounded-1 pr-[3px] outline-none disabled:bg-gray-3 disabled:text-gray-11'
                  }
                >
                  <CalendarIcon size={16} className="stroke-pp-gray-3" />
                </Button>
              </Group>
              <Popover className="bg-white pointer-events-auto rounded-1 p-3 shadow-[0px_7px_29px_rgba(100,100,111,0.2)]">
                <Dialog>
                  <I18nProvider locale="en-UK">
                    <Calendar
                      focusedValue={focusedDate}
                      onFocusChange={setFocusedDate}
                    >
                      <Box className="mx-[0.5rem] mb-1 flex justify-between">
                        <Button
                          slot="previous"
                          className={
                            'text-base hover:text-black m-0 flex h-[1.5em] w-[1.5em] items-center justify-center rounded-1 border border-solid border-slate-6 text-slate-10 hover:border-slate-12 data-[disabled]:cursor-not-allowed data-[disabled]:border-gray-3 data-[disabled]:text-gray-6'
                          }
                        >
                          <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        <DatePickerYearSelector
                          focusedValue={focusedDate}
                          onFocusedDateChange={setFocusedDate}
                          minValue={props?.minValue}
                          maxValue={props?.maxValue}
                        />

                        <Button
                          slot="next"
                          className={
                            'text-base hover:text-black m-0 flex h-[1.5em] w-[1.5em] items-center justify-center rounded-1 border border-solid border-slate-6 text-slate-10 hover:border-slate-12 data-[disabled]:cursor-not-allowed data-[disabled]:border-gray-3 data-[disabled]:text-gray-6'
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
                              'data-[selected]:text-white [&[aria-label*="Today"]]:bg-pp-focus-bg data-[outside-month]:opacity-35 m-px w-[2em] cursor-pointer rounded-[6px] text-center text-[13px] leading-[2em] outline-none hover:!bg-iris-6 data-[disabled]:cursor-not-allowed data-[outside-month]:!cursor-default data-[disabled]:!bg-transparent data-[outside-month]:!bg-transparent data-[selected]:!bg-iris-12 data-[disabled]:text-gray-6'
                            }
                          />
                        )}
                      </CalendarGrid>
                    </Calendar>
                  </I18nProvider>
                </Dialog>
              </Popover>
            </DatePicker>
          )}
        />
        {showError && <FormFieldError name={field} />}
      </FormFieldContainer>
    </I18nProvider>
  )
}

export { DatePickerInput }
