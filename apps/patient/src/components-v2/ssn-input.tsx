'use client'

import * as React from 'react'
import { cn } from '@psychplus-v2/utils'
import { TextField } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

type InputProps = Pick<React.ComponentProps<typeof TextField.Input>, 'size'>

interface SSNInputProps extends InputProps {
  name: string
  editable?: boolean
  placeholder?: string
  className?: string
}

const SSNInput = ({
  name,
  editable,
  placeholder = 'SSN',
  className,
  ...rest
}: SSNInputProps) => {
  const form = useFormContext()

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <PatternFormat
            size="3"
            id={name}
            type="text"
            inputMode="numeric"
            format="###-##-####"
            className={cn(className)}
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
            {...rest}
          />
        )
      }}
    />
  )
}

export { SSNInput }
