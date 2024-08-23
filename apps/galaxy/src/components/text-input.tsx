'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from './block-label'

interface TextInputProps {
  label?: string
  field: string
  autoFocus?: boolean
}

const TextInput = ({ label, field, autoFocus }: TextInputProps) => {
  const form = useFormContext()

  return (
    <Flex align="center" gap="2">
      {label && <BlockLabel name={field}>{label}</BlockLabel>}
      <TextField.Root
        size="1"
        autoFocus={autoFocus}
        className="h-[var(--chip-height)]"
        {...form.register(field)}
      />
    </Flex>
  )
}

export { TextInput }
