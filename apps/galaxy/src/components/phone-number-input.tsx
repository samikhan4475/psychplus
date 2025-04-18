'use client'

import * as React from 'react'
import { Flex, TextField } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { cn } from '@/utils'
import { BlockLabel } from './block-label'

interface PhoneNumberInputProps {
  label?: string
  field: string
  format?: string
  placeholder?: string
  autoFocus?: boolean
  className?: string
  labelClassName?: string
  isFormattedValue?: boolean
}

const PhoneNumberInput = ({
  label,
  field: fieldName,
  placeholder = '',
  format = '(###)-###-####',
  className,
  autoFocus,
  isFormattedValue,
  labelClassName,
}: PhoneNumberInputProps) => {
  const form = useFormContext()

  return (
    <Flex align="center" gap="2">
      {label && (
        <BlockLabel className={labelClassName} name={fieldName}>
          {label}
        </BlockLabel>
      )}
      <Controller
        control={form.control}
        name={fieldName}
        render={({ field }) => {
          return (
            <PatternFormat
              autoFocus={autoFocus}
              size="1"
              id={fieldName}
              type="text"
              inputMode="numeric"
              format={format}
              mask="_"
              allowEmptyFormatting={false}
              placeholder={placeholder}
              name={fieldName}
              value={field.value}
              disabled={field.disabled}
              onValueChange={({ value, formattedValue }) =>
                field.onChange(isFormattedValue ? formattedValue : value)
              }
              onBlur={field.onBlur}
              customInput={TextField.Root}
              getInputRef={field.ref}
              className={cn('w-full', className)}
            />
          )
        }}
      />
    </Flex>
  )
}

export { PhoneNumberInput }
