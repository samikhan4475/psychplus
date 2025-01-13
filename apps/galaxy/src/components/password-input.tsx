'use client'

import { useState } from 'react'
import { EyeOpenIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { IconButton, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EyeOffIcon } from '@/components/icons'

interface PasswordInputProps {
  label?: string
  field: string
  autoFocus?: boolean
  className?: string
  placeHolder?: string
  disabled?: boolean
  required?: boolean
  maxLength?: number
  onchange?: (value?: string) => void
}

const PasswordInput = ({
  label,
  field,
  autoFocus,
  className,
  placeHolder,
  disabled = false,
  required = false,
  maxLength,
  onchange,
}: PasswordInputProps) => {
  const form = useFormContext()
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }
  return (
    <FormFieldContainer>
      <FormFieldLabel>{label}</FormFieldLabel>
      <TextField.Root
        size="2"
        {...form.register(field, {
          ...(onchange && { onChange: onchange }),
        })}
        radius="full"
        required={required}
        autoFocus={autoFocus}
        placeholder={placeHolder}
        disabled={disabled}
        className={className}
        maxLength={maxLength}
        type={showPassword ? 'text' : 'password'}
      >
        <TextField.Slot>
          <LockClosedIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Slot className="justify-end">
          <IconButton
            size="1"
            variant="ghost"
            type="button"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <EyeOpenIcon height="16" width="16" className="text-pp-gray-3" />
            ) : (
              <EyeOffIcon height="16" width="16" className="text-pp-gray-3" />
            )}
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
      <FormFieldError name="password" />
    </FormFieldContainer>
  )
}

export { PasswordInput }
