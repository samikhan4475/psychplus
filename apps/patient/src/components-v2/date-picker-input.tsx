'use client'

import { CalendarDate, ZonedDateTime } from '@internationalized/date'
import { cn } from '@psychplus-v2/utils'
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
  I18nProvider,
  Popover,
} from 'react-aria-components'
import { Controller, useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError } from './form'

interface DatePickerInputProps {
  label?: string
  field: string
  isRequired?: boolean
  isDisabled?: boolean
  yearFormat?: 'YYYY' | 'YY'
  dateInputClass?: string
  showError?: boolean
  datePickerClass?: string
  className?: string
  maxValue?: DateValue | ZonedDateTime | CalendarDate
  minValue?: DateValue | ZonedDateTime | CalendarDate
  showIcon?: boolean
}

const DatePickerInput = ({
  label,
  field,
  isRequired,
  isDisabled,
  yearFormat = 'YY',
  datePickerClass,
  showError = true,
  dateInputClass,
  className,
  maxValue,
  minValue,
  showIcon = true,
  ...props
}: DatePickerInputProps) => {
  const form = useFormContext()
  const { control, formState } = form

  return (
    <I18nProvider locale="en-US">
      <FormFieldContainer
        className={cn('w-full gap-0.5 text-[12px]', className)}
      >
        {label && (
          <Text size="1" weight="medium">
            {label}
          </Text>
        )}
        {isRequired && (
          <Text className="ml-[2px] text-[11px] text-red-9">*</Text>
        )}

        <Controller
          control={control}
          name={field}
          rules={isRequired ? { required: 'Required' } : undefined}
          render={({
            field: { name, value, onChange, onBlur },
            fieldState: { invalid },
          }) => (
            <DatePicker
              name={name}
              value={value ?? null}
              maxValue={maxValue as DateValue}
              minValue={minValue as DateValue}
              onChange={(date) => {
                if (yearFormat === 'YY' && date instanceof CalendarDate) {
                  const currentYear = new Date().getFullYear()
                  const updatedDate = new CalendarDate(
                    Math.floor(currentYear / 100) * 100 + (date.year % 100),
                    date.month,
                    date.day,
                  )
                  onChange(updatedDate)
                } else {
                  onChange(date)
                }
              }}
              onBlur={onBlur}
              isRequired
              validationBehavior="aria"
              aria-label="date picker"
              isInvalid={invalid}
              className={datePickerClass}
              isDisabled={
                formState.disabled || formState.isSubmitting || isDisabled
              }
              {...props}
            >
              <Group
                className={cn(
                  'flex h-6 w-full items-center gap-2 rounded-6 border border-gray-8 bg-[white] px-2 data-[disabled]:cursor-not-allowed data-[disabled]:bg-gray-3',
                  dateInputClass,
                )}
              >
                <DateInput className="flex w-full overflow-hidden">
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
                {showIcon && (
                  <Button className="outline-none disabled:bg-gray-3 disabled:text-gray-11">
                    <CalendarIcon size="13" stroke="#8B8D98" />
                  </Button>
                )}
              </Group>
              <Popover className="bg-white pointer-events-auto rounded-1 p-3 shadow-[0px_7px_29px_rgba(100,100,111,0.2)]">
                <Dialog>
                  <I18nProvider locale="en-UK">
                    <Calendar>
                      <Box className="mx-[0.5rem] mb-1 flex justify-between">
                        <Button slot="previous" className={buttonClasses}>
                          <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        <Heading className="flex-1 text-center text-[14px] font-medium" />
                        <Button slot="next" className={buttonClasses}>
                          <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                      </Box>
                      <CalendarGrid className="[&__.react-aria-CalendarHeaderCell]:text-[13px] [&__.react-aria-CalendarHeaderCell]:font-medium">
                        {(date) => (
                          <CalendarCell
                            date={date}
                            className={
                              'data-[selected]:text-white [&[aria-label*="Today"]]:bg-pp-focus-bg data-[outside-month]:opacity-35 ' +
                              'm-px w-[2em] cursor-pointer rounded-[6px] text-center text-[13px] leading-[2em] ' +
                              'outline-none hover:!bg-iris-6 data-[disabled]:cursor-not-allowed ' +
                              'data-[outside-month]:!cursor-default data-[disabled]:!bg-transparent ' +
                              'data-[outside-month]:!bg-transparent data-[selected]:!bg-iris-12 data-[disabled]:text-gray-6'
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

const buttonClasses = cn(
  'text-base hover:text-black m-0 flex h-[1.5em] w-[1.5em] items-center justify-center rounded-1 border border-solid',
  'border-slate-6 text-slate-10 hover:border-slate-12',
  'data-[disabled]:cursor-not-allowed data-[disabled]:border-gray-3 data-[disabled]:text-gray-6',
)

export { DatePickerInput }
