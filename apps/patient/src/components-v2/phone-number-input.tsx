'use client'

import * as React from 'react'
import { TextField } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

interface PhoneNumberInputProps {
  name: string
  size?: React.ComponentProps<typeof TextField.Input>['size']
  autoFocus?: boolean
  editable?: boolean
  placeholder?: string
  classNames?: string
}

const PhoneNumberInput = ({
  name,
  autoFocus,
  size = '3',
  editable,
  placeholder = 'Phone number',
  classNames,
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
            placeholder={placeholder}
            name={name}
            value={field.value}
            disabled={field.disabled}
            onValueChange={({ value }) => field.onChange(value)}
            onBlur={field.onBlur}
            customInput={TextField.Input}
            readOnly={editable}
            className={classNames}
          />
        )
      }}
    />
  )
}

export { PhoneNumberInput }
