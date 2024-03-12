'use client'

import * as React from 'react'
import { useState } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { Box } from '@radix-ui/themes'
import { PatternFormat } from 'react-number-format'
import { cn } from './cn'
import { TextField, type TextFieldInputProps } from './text-field'

interface SsnInputProps extends TextFieldInputProps {
  onValueChange?: (value: string) => void
}

const SsnInput = React.forwardRef<HTMLInputElement, SsnInputProps>(
  (
    {
      size,
      id,
      name,
      value,
      disabled,
      onValueChange,
      className,
    }: SsnInputProps,
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value)
    const [showPassword, setShowPassword] = useState(true)
    const [originalValue, setOriginalValue] = useState(value)
    const [maskedValue, setMaskedValue] = useState(value)

    const handleValue = () => {
      const stringValue = inputValue as string

      setMaskedValue(inputValue ? `*****${stringValue.substring(5)}` : '')
      setOriginalValue(inputValue)
      setShowPassword(false)
    }

    const PasswordIcon = showPassword ? EyeOpenIcon : EyeClosedIcon

    return (
      <Box className="relative">
        <PatternFormat
          size={size}
          id={id}
          getInputRef={ref}
          type="tel"
          valueIsNumericString
          inputMode="tel"
          format="###-##-####"
          mask="x"
          allowEmptyFormatting
          name={name}
          value={(showPassword ? originalValue : maskedValue) as string}
          disabled={disabled}
          onValueChange={({ value }) => {
            setInputValue(value)
            onValueChange?.(originalValue as string)
          }}
          onBlur={handleValue}
          customInput={TextField.Input}
          className={cn(className, {
            ['text-gray-8']: !inputValue,
          })}
        />
        <Box onClick={() => setShowPassword(!showPassword)}>
          <PasswordIcon
            className="absolute right-2 top-3"
            height="16"
            width="16"
            color="gray"
          />
        </Box>
      </Box>
    )
  },
)

SsnInput.displayName = 'SsnInput'

export { SsnInput, type SsnInputProps }
