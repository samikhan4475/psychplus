'use client'

import { cn } from '@psychplus-v2/utils'
import { Flex, TextFieldInput } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
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
      <TextFieldInput
        required={required}
        size="1"
        radius="small"
        autoFocus={autoFocus}
        disabled={disabled}
        className={cn('h-[var(--chip-height)]', className)}
        {...form.register(field)}
      />
    </Flex>
  )
}

export { TextInput }
