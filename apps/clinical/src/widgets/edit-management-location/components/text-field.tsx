import { forwardRef } from 'react'
import { Box, Text, TextField } from '@radix-ui/themes'
import { UseFormRegister } from 'react-hook-form'
import { AddressForm } from '../types'

const TextFieldLabel = forwardRef<
  HTMLInputElement,
  {
    label: string
    placeholder?: string
    type: 'text'
    disabled?: boolean
    className?: string
    value?: string
    error?: string
    onChange?: (value: string) => void
    register?: ReturnType<UseFormRegister<AddressForm>>
    required?: boolean
  }
>(
  (
    {
      label,
      placeholder,
      error,
      onChange,
      value,
      type,
      disabled,
      className,
      register,
      required,
    },
    ref,
  ) => (
    <Box>
      <Text size="2" mr="1" weight="bold">
        {label} {required && <span className="text-[#FF0000]">*</span>}
      </Text>
      <TextField.Root
        ref={ref}
        className={`h-30 ${className}`}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        {...register}
      />
      {error && (
        <Text size="2" color="red">
          {error}
        </Text>
      )}
    </Box>
  ),
)
TextFieldLabel.displayName = 'TextFieldLabel'
export default TextFieldLabel
