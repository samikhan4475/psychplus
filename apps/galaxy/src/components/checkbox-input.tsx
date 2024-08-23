'use client'

import { Checkbox, Flex } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { BlockLabel } from './block-label'

interface CheckboxInputProps extends React.ComponentProps<typeof Checkbox> {
  label?: string
  field: string
}

const CheckboxInput = ({
  label,
  field: fieldName,
  className,
  ...checkboxProps
}: CheckboxInputProps) => {
  const form = useFormContext()

  return (
    <Flex align="start" gap="2">
      <Controller
        name={fieldName}
        control={form.control}
        render={({ field }) => {
          const { ref, ...rest } = field

          return (
            <Checkbox
              size="1"
              onCheckedChange={field.onChange}
              className={cn('h-[var(--chip-height)]', className)}
              id={fieldName}
              highContrast
              {...rest}
              {...checkboxProps}
            />
          )
        }}
      />
      {label && (
        <BlockLabel
          name={fieldName}
          className="text-wrap max-w-xl font-regular"
        >
          {label}
        </BlockLabel>
      )}
    </Flex>
  )
}

export { CheckboxInput }
