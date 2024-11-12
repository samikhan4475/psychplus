'use client'

import * as React from 'react'
import { Flex, TextField } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { cn } from '@/utils'
import { BlockLabel } from './block-label'
import { FormFieldError } from './form'

interface NumberInputProps {
  label?: string
  field: string
  format?: string
  placeholder?: string
  autoFocus?: boolean
  className?: string
  disabled?: boolean
  required?: boolean
  showError?: boolean
  min?: number
  max?: number
}

const NumberInput = ({
  label,
  field: fieldName,
  placeholder = '00',
  format = '##',
  className,
  autoFocus,
  disabled,
  required = false,
  showError = false,
  min,
  max,
}: NumberInputProps) => {
  const form = useFormContext()

  const handleOnValueChange = (
    value: string,
    onChange: (value: string) => void,
  ) => {
    const numericValue = parseInt(value, 10)

    if (
      numericValue.toString().length === 2 &&
      min !== undefined &&
      max !== undefined
    ) {
      if (numericValue < min) {
        onChange(min.toString())
      } else if (numericValue > max) {
        onChange(max.toString())
      } else {
        onChange(value)
      }
    } else {
      onChange(value)
    }
  }

  const handleOnBlur = (value: string, onChange: (value: string) => void) => {
    const numericValue = parseInt(value, 10);
    if (min !== undefined && numericValue < min) {
      onChange(min?.toString() || '');
    }
  };

  return (
    <Flex align="center" gap="2">
      {label && (
        <BlockLabel name={fieldName} required={required}>
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
              mask=""
              allowEmptyFormatting={false}
              placeholder={placeholder}
              name={fieldName}
              value={field.value}
              disabled={field.disabled || disabled}
              onValueChange={({ value }) =>
                handleOnValueChange(value, field.onChange)
              }
              onBlur={() => handleOnBlur(field.value, field.onChange)}
              customInput={TextField.Root}
              getInputRef={field.ref}
              className={cn('h-[var(--chip-height)]', className)}
            />
          )
        }}
      />
      {showError && <FormFieldError name={fieldName} />}
    </Flex>
  )
}

export { NumberInput }
