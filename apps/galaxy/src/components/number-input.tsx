'use client'

import * as React from 'react'
import { Flex, Text, TextField } from '@radix-ui/themes'
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
  isAllowed?: (values: any) => boolean
  onValueChange?: (value: string) => void
  suffixText?: string
  suffixClassName?: string
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
  isAllowed,
  onValueChange,
  suffixText,
  suffixClassName,
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
    const numericValue = parseInt(value, 10)
    if (min !== undefined && numericValue < min) {
      onChange(min?.toString() || '')
    }
  }

  return (
    <Flex align="center" gap="2">
      {label && (
        <BlockLabel name={fieldName} required={required}>
          {label}
        </BlockLabel>
      )}
      <div className="relative">
        <Controller
          control={form.control}
          name={fieldName}
          render={({ field }) => (
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
                onValueChange
                  ? onValueChange(value)
                  : handleOnValueChange(value, field.onChange)
              }
              onBlur={() => handleOnBlur(field.value, field.onChange)}
              customInput={TextField.Root}
              getInputRef={field.ref}
              className={cn('h-[var(--chip-height)]', className)}
              {...(isAllowed && { isAllowed })}
            />
          )}
        />

        {suffixText && (
          <Text
            className={cn(
              'pointer-events-none absolute right-0 top-0  flex h-full min-w-[18px]  items-center justify-center overflow-hidden rounded-r-1  rounded-br-1 rounded-tr-1 border-[1px]  border-solid border-gray-8 bg-gray-2 px-1 text-center text-[10px]',
              suffixClassName,
            )}
          >
            {suffixText}
          </Text>
        )}
      </div>

      {showError && <FormFieldError name={fieldName} />}
    </Flex>
  )
}

export { NumberInput }
