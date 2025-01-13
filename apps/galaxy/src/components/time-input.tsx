'use client'

import { Box } from '@radix-ui/themes'
import { Clock3 } from 'lucide-react'
import {
  DateInput,
  DateSegment,
  TimeField,
  TimeFieldProps,
  TimeValue,
} from 'react-aria-components'
import { Controller, useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { cn } from '@/utils'

interface TimeInputProps<T extends TimeValue> extends TimeFieldProps<T> {
  label?: string
  field: string
  isRequired?: boolean
  aria_lable?: string
  className?: string
  dateInputClass?: string
  showIcon?: boolean
  showError?: boolean
}

const TimeInput = <T extends TimeValue>({
  label,
  isRequired,
  field,
  aria_lable,
  className,
  dateInputClass,
  showIcon = false,
  showError = false,
  ...props
}: TimeInputProps<T>) => {
  const form = useFormContext()
  return (
    <FormFieldContainer className={cn('w-full', className)}>
      {label && <FormFieldLabel required={isRequired}>{label}</FormFieldLabel>}
      <Controller
        control={form.control}
        name={field}
        rules={isRequired ? { required: 'Required' } : undefined}
        render={({
          field: { name, value, onChange, onBlur },
          fieldState: { invalid },
        }) => (
          <TimeField
            name={name}
            value={value ?? null}
            onChange={onChange}
            hourCycle={24}
            onBlur={onBlur}
            isInvalid={invalid}
            className="w-full"
            isDisabled={form.formState.disabled}
            isRequired
            validationBehavior="aria"
            aria-label={aria_lable ?? 'time input field'}
            {...props}
          >
            <Box className="relative flex w-full items-center">
              <DateInput
                className={cn(
                  'border-pp-gray-2 flex h-7 w-full items-center overflow-hidden rounded-1 border px-1 data-[disabled]:cursor-not-allowed data-[disabled]:bg-gray-3',
                  dateInputClass,
                )}
              >
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
              {showIcon && (
                <Box className="pointer-events-none absolute right-2">
                  <Clock3 height="14px" width="14px" color="gray" />
                </Box>
              )}
            </Box>
          </TimeField>
        )}
      />
      {showError && <FormFieldError name={field} />}
    </FormFieldContainer>
  )
}

export { TimeInput }
