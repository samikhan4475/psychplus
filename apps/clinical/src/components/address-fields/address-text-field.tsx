import { forwardRef } from 'react'
import { Box, Text, TextField } from '@radix-ui/themes'

const AddressTextField = forwardRef<
  HTMLInputElement,
  {
    label: string
    placeholder?: string
    type: string
    disabled?: boolean
    className?: string
    value?: string
    error?: string
    onChange?: (value: string) => void
    register?: any
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
      <Text size="1" mr="1" weight="bold">
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
        <Text size="1" className="text-[#FF0000]">
          {error}
        </Text>
      )}
    </Box>
  ),
)
AddressTextField.displayName = 'AddressTextField'
export default AddressTextField
