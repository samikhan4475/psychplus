'use client'

import * as React from 'react'
import { Flex, TextField } from '@radix-ui/themes'
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
  formatOnBlurOnly
}: NumericInputProps) => {
  const form = useFormContext()

  return (
    <Flex align="center" gap="2" className={containerClassName}>
      {label && <BlockLabel name={fieldName}>{label}</BlockLabel>}
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
              value={formatOnBlurOnly ? field.value : formatValueWithDecimals(field.value)}
              disabled={field.disabled || disabled}
              onValueChange={({ value }) => field.onChange(value)}
              isAllowed={(values) => {
                const { floatValue = 0 } = values
                return floatValue < maxLimit
              }}
              onBlur={() => {
                if (!field.value || !allowNegative) return
                const formattedValue = formatValueWithDecimals(field.value)
                field.onChange(formattedValue)
                field.onBlur()
              }}
              customInput={TextField.Root}
              getInputRef={field.ref}
              className={cn('h-[var(--chip-height)]', className)}
            />
          )
        }}
      />
    </Flex>
  )
}

export { NumericInput }
