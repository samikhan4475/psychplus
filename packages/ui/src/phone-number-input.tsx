'use client'

import * as React from 'react'
import { useState } from 'react'
import { PatternFormat } from 'react-number-format'
import { cn } from './cn'
import { TextField, type TextFieldInputProps } from './text-field'

interface PhoneNumberInputProps extends TextFieldInputProps {
  onValueChange?: (value: string) => void
  size: any
  id?: string
}

const PhoneNumberInput = React.forwardRef<
  HTMLInputElement,
  PhoneNumberInputProps
>(
  (
    {
      size,
      id,
      name,
      value,
      disabled,
      onValueChange,
      onBlur,
      className,
    }: PhoneNumberInputProps,
    ref,
  ) => {
    const [_value, _setValue] = useState(value)

    return (
      <PatternFormat
        size={size}
        id={id}
        getInputRef={ref}
        type="tel"
        inputMode="tel"
        format="(###) ###-####"
        mask="_"
        allowEmptyFormatting
        name={name}
        value={value as string}
        disabled={disabled}
        onValueChange={({ value }) => {
          _setValue(value)
          onValueChange?.(value)
        }}
        onBlur={onBlur}
        customInput={TextField.Root}
        className={cn(className, {
          ['text-gray-8']: !_value,
        })}
      />
    )
  },
)

PhoneNumberInput.displayName = 'PhoneNumberInput'

export { PhoneNumberInput, type PhoneNumberInputProps }
