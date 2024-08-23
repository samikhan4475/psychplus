'use client'

import { Flex, TextArea } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { BlockLabel } from './block-label'

interface TextAreaInputProps {
  label?: string
  field: string
  autoFocus?: boolean
  className?: string
}

const TextAreaInput = ({
  label,
  field,
  autoFocus,
  className,
}: TextAreaInputProps) => {
  const form = useFormContext()

  return (
    <Flex align="center" gap="2">
      {label && <BlockLabel name={field}>{label}</BlockLabel>}
      <TextArea
        size="1"
        autoFocus={autoFocus}
        className={cn('h-[var(--chip-height)]', className)}
        {...form.register(field)}
      />
    </Flex>
  )
}

export { TextAreaInput }
