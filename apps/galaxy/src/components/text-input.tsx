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
}

const TextInput = ({ label, field, autoFocus, className }: TextInputProps) => {
  const form = useFormContext()

  return (
    <Flex align="center" gap="2">
      {label && <BlockLabel name={field}>{label}</BlockLabel>}
      <TextField.Root
        size="1"
        autoFocus={autoFocus}
        className={cn('h-[var(--chip-height)]', className)}
        {...form.register(field)}
      />
    </Flex>
  )
}

export { TextInput }
