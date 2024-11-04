import React from 'react'
import { Text, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from '../schema'

interface DollarInputProps {
  name: string
  placeholder?: string
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  className?: string
  disabled?: boolean
}

const DollarInput = ({
  name,
  placeholder = '0.00',
  onKeyDown,
  className,
  disabled = false,
}: DollarInputProps) => {
  const { register } = useFormContext<SchemaType>()

  return (
    <TextField.Root
      {...register(name as keyof SchemaType)}
      disabled={disabled}
      onKeyDown={onKeyDown}
      variant="soft"
      placeholder={placeholder}
      className={`h-4 !rounded-[0px] !border-transparent bg-transparent !outline-none ${className}`}
      size="1"
    >
      <TextField.Slot>
        <Text className="text-[12px]">$</Text>
      </TextField.Slot>
    </TextField.Root>
  )
}

export { DollarInput }
