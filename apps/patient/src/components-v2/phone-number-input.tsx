'use client'

import * as React from 'react'
import { cn } from '@psychplus-v2/utils'
import { TextField } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

interface PhoneNumberInputProps {
  name: string
  size?: React.ComponentProps<typeof TextField.Input>['size']
  autoFocus?: boolean
}

const PhoneNumberInput = ({
  name,
  autoFocus,
  size = '3',
}: PhoneNumberInputProps) => {
  const form = useFormContext()

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <PatternFormat
            autoFocus={autoFocus}
            size={size}
            id={name}
            type="text"
            inputMode="numeric"
            format="(###)-###-####"
            mask="_"
            allowEmptyFormatting={false}
            placeholder="Phone number"
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

export { PhoneNumberInput }
