'use client'

import { Flex, Select } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { BlockLabel } from './block-label'

interface SelectInputProps<T> extends React.ComponentProps<typeof Select.Root> {
  label?: string
  field: string
  options?: { label: string; value: T }[]
  placeholder?: string
  buttonClassName?: string
}

const SelectInput = <T extends string>({
  label,
  field,
  placeholder = 'Select',
  options = [],
  buttonClassName,
  ...selectProps
}: SelectInputProps<T>) => {
  const form = useFormContext()

  const items = options.map((option) => (
    <Select.Item key={option.value} value={option.value}>
      {option.label}
    </Select.Item>
  ))

  return (
    <Flex align="center" gap="2">
      {label && <BlockLabel name={field}>{label}</BlockLabel>}
      <Controller
        name={field}
        control={form.control}
        render={({ field }) => {
          const { ref, ...rest } = field

          return (
            <Select.Root
              size="1"
              onValueChange={field.onChange}
              {...rest}
              {...selectProps}
            >
              <Select.Trigger
                placeholder={placeholder}
                className={cn('h-[var(--chip-height)]', buttonClassName)}
              />
              <Select.Content position="popper" align="center" highContrast>
                {items}
              </Select.Content>
            </Select.Root>
          )
        }}
      />
    </Flex>
  )
}

export { SelectInput }
