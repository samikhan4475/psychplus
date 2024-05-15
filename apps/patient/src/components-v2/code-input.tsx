'use client'

import * as React from 'react'
import { cn } from '@psychplus-v2/utils'
import { TextField } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

interface CodeInputProps {
  name: string
  autoFocus?: boolean
}

const CodeInput = ({ name, autoFocus }: CodeInputProps) => {
  const form = useFormContext()

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <PatternFormat
            autoFocus={autoFocus}
            size="3"
            id={name}
            type="text"
            inputMode="numeric"
            format="#####"
            mask=""
            allowEmptyFormatting={false}
            placeholder="Enter code"
            name={name}
            value={field.value}
            disabled={field.disabled}
            onValueChange={({ value }) => field.onChange(value)}
            onBlur={field.onBlur}
            customInput={TextField.Input}
            className={cn({
              'font-mono': field.value,
            })}
          />
        )
      }}
    />
  )
}

export { CodeInput }
