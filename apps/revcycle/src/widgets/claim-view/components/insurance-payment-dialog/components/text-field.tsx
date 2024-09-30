import { forwardRef } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Text, TextField } from '@radix-ui/themes'

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
    required?: boolean
    isSearchInput?: boolean
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
      isSearchInput,
    },
    ref,
  ) => (
    <Box>
      <Text size="1" mr="1">
        {label} {required && <span className="text-[#FF0000]">*</span>}
      </Text>
      <TextField.Root
        ref={ref}
        className={`h-30 relative flex items-center ${className}`}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        value={value}
        {...register}
      >
        {isSearchInput && (
          <TextField.Slot className="absolute right-1">
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        )}
      </TextField.Root>
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
