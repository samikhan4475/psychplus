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
  placeHolder?: string
  maxLength?: number
  formContainerClassName?: string
}

const TextAreaInput = ({
  label,
  field,
  autoFocus,
  className,
  placeHolder,
  maxLength,
  formContainerClassName,
}: TextAreaInputProps) => {
  const form = useFormContext()

  return (
    <Flex
      align="center"
      gap="2"
      className={cn('w-full', formContainerClassName)}
    >
      {label && <BlockLabel name={field}>{label}</BlockLabel>}
      <TextArea
        size="1"
        autoFocus={autoFocus}
        className={cn('h-[var(--chip-height)]', className)}
        placeholder={placeHolder}
        maxLength={maxLength}
        {...form.register(field)}
      />
    </Flex>
  )
}

export { TextAreaInput }
