'use client'

import * as React from 'react'
import { PatternFormat } from 'react-number-format'
import { cn } from './cn'
import { TextField, type TextFieldInputProps } from './text-field'

interface PhoneNumberInputProps extends TextFieldInputProps {
  onValueChange?: (value: string) => void
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
    return (
      <PatternFormat
        size={size}
        id={id}
        getInputRef={ref}
        type="tel"
        inputMode="tel"
        format="(###)˗###˗####"
        mask="_"
        allowEmptyFormatting
        name={name}
        value={value as string}
        disabled={disabled}
        onValueChange={({ value }) => {
          if (onValueChange) {
            onValueChange(value)
          }
        }}
        onBlur={onBlur}
        customInput={TextField.Input}
        className={cn(`font-[Courier] tracking-[-1px]`, className, {
          ['text-gray-8']: !value,
        })}
      />
    )
  },
)

PhoneNumberInput.displayName = 'PhoneNumberInput'

export { PhoneNumberInput, type PhoneNumberInputProps }
