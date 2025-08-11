'use client'

import * as React from 'react'
import { Box, Flex, Text, TextField } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { cn, formatValueWithDecimals } from '@/utils'
import { BlockLabel } from './block-label'

interface NumericInputProps {
  label?: string
  field: string
  placeholder?: string
  autoFocus?: boolean
  className?: string
  disabled?: boolean
  decimalScale?: number
  prefix?: string
  maxLimit?: number
  allowNegative?: boolean
  containerClassName?: string
  formatOnBlurOnly?: boolean
  suffixText?: string
  suffixClassName?: string
  isAllowed?: (values: {
    floatValue?: number
    formattedValue: string
    value: string
  }) => boolean
  onChangeCallback?: (value?: string) => void
}

const NumericInput = ({
  label,
  field: fieldName,
  placeholder = '00',
  className,
  autoFocus,
  disabled,
  decimalScale = 2,
  prefix = '$',
  maxLimit = 1000,
  containerClassName,
  allowNegative = true,
  formatOnBlurOnly,
  suffixText,
  suffixClassName,
  isAllowed,
  onChangeCallback,
}: NumericInputProps) => {
  const form = useFormContext()
  return (
    <Flex align="center" gap="2" className={containerClassName}>
      {label && <BlockLabel name={fieldName}>{label}</BlockLabel>}
      <Box className="relative">
        <Controller
          control={form.control}
          name={fieldName}
          render={({ field }) => {
            return (
              <NumericFormat
                autoFocus={autoFocus}
                size="1"
                id={fieldName}
                type="text"
                prefix={prefix}
                decimalScale={decimalScale}
                placeholder={placeholder}
                name={fieldName}
                allowNegative={allowNegative}
                value={
                  formatOnBlurOnly
                    ? field.value
                    : formatValueWithDecimals(field.value)
                }
                disabled={field.disabled || disabled}
                onValueChange={({ value }) => {
                  field.onChange(value)
                  onChangeCallback?.(value)
                }}
                isAllowed={
                  isAllowed ??
                  (({ floatValue = 0 }) => {
                    return floatValue < maxLimit
                  })
                }
                onBlur={() => {
                  if (!field.value || !allowNegative) return
                  const formattedValue = formatValueWithDecimals(field.value)
                  field.onChange(formattedValue)
                  field.onBlur()
                  onChangeCallback?.(formattedValue)
                }}
                customInput={TextField.Root}
                getInputRef={field.ref}
                className={cn('h-[var(--chip-height)]', className)}
              />
            )
          }}
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
      </Box>
    </Flex>
  )
}

export { NumericInput }
