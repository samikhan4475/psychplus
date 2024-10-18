'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { cn } from '@/utils'

interface ReadOnlyTextInputProps {
  value: string
  autoFocus?: boolean
  className?: string
  disabled?: boolean
}

const ReadOnlyTextInput = ({
  value,
  autoFocus = false,
  className,
  disabled = true,
}: ReadOnlyTextInputProps) => {
  return (
    <Flex align="center" gap="2">
      <TextField.Root
        size="1"
        autoFocus={autoFocus}
        disabled={disabled}
        className={cn('h-[var(--chip-height)]', className)}
        value={value}
      ></TextField.Root>
    </Flex>
  )
}

export { ReadOnlyTextInput }
