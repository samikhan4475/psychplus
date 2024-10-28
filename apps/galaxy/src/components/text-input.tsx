'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { BlockLabel } from './block-label'

interface TextInputProps {
  label?: string
  field: string
  autoFocus?: boolean
  className?: string
  placeHolder?: string
  disabled?: boolean
  required?: boolean
}

const TextInput = ({
  label,
  field,
  autoFocus,
  className,
  placeHolder,
  disabled = false,
  required = false,
}: TextInputProps) => {
  const form = useFormContext()

  return (
    <Flex align="center" gap="2">
      {label && (
        <BlockLabel required={required} name={field}>
          {label}
        </BlockLabel>
      )}
      <TextField.Root
        size="1"
        autoFocus={autoFocus}
        placeholder={placeHolder}
        disabled={disabled}
        className={cn('h-[var(--chip-height)]', className)}
        {...form.register(field)}
      />
    </Flex>
  )
}

export { TextInput }
