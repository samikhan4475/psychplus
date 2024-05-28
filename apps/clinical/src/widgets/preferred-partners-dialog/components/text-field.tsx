import { forwardRef } from 'react'
import { Box, Text, TextFieldInput } from '@radix-ui/themes'

const TextFieldLabel = forwardRef<
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
    },
    ref,
  ) => (
    <Box>
      <Text size="1" mr="1">
        {label}
      </Text>
      <TextFieldInput
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
TextFieldLabel.displayName = 'TextFieldLabel'
export default TextFieldLabel
