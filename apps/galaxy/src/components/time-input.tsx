'use client'

import {
  DateInput,
  DateSegment,
  TimeField,
  TimeFieldProps,
  TimeValue,
} from 'react-aria-components'
import { Controller, useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { cn } from '@/utils'

interface TimeInputProps<T extends TimeValue> extends TimeFieldProps<T> {
  label?: string
  field: string
  isRequired?: boolean
  aria_lable?: string
  className?: string
  dateInputClass?: string
}

const TimeInput = <T extends TimeValue>({
  label,
  isRequired,
  field,
  aria_lable,
  className,
  dateInputClass,
  ...props
}: TimeInputProps<T>) => {
  const form = useFormContext()
  return (
    <FormFieldContainer className={cn('w-full', className)}>
      {label && <FormFieldLabel>Time</FormFieldLabel>}
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
            onBlur={onBlur}
            isInvalid={invalid}
            className="w-full"
            isDisabled={form.formState.disabled}
            isRequired
            validationBehavior="aria"
            aria-label={aria_lable ?? 'time input field'}
            {...props}
          >
            <DateInput
              className={cn(
                'border-pp-gray-2 flex h-7 w-full items-center overflow-hidden rounded-1 border px-1 ',
                dateInputClass,
              )}
            >
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </TimeField>
        )}
      />
    </FormFieldContainer>
  )
}

export { TimeInput }
