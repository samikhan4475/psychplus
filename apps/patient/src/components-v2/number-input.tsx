'use client'

import * as React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Flex } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { BlockLabel } from './block-label'

interface NumberInputProps {
  label?: string
  field: string
  format?: string
  placeholder?: string
  autoFocus?: boolean
  className?: string
  disabled?: boolean
  required?: boolean
}

const NumberInput = ({
  label,
  field: fieldName,
  placeholder = '00',
  format = '##',
  className,
  autoFocus,
  disabled,
  required,
}: NumberInputProps) => {
  const form = useFormContext()

  return (
    <Flex align="start" gap="2" direction={'column'} className="w-full">
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
              onValueChange={({ value }) => field.onChange(value)}
              onBlur={field.onBlur}
              getInputRef={field.ref}
              className={cn(
                'h-[var(--chip-height)] px-2 py-1 text-[12px]',
                className,
              )}
            />
          )
        }}
      />
    </Flex>
  )
}

export { NumberInput }
