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
  className?: string
  tooltip?: boolean
}

const SelectInput = <T extends string>({
  label,
  field,
  placeholder = 'Select',
  options = [],
  className,
  buttonClassName,
  onValueChange,
  tooltip,
  ...selectProps
}: SelectInputProps<T>) => {
  const form = useFormContext()

  const items = options.map((option) => (
    <Select.Item key={option.value} value={option.value}>
      {option.label}
    </Select.Item>
  ))

  const findLabel = (value: T) => {
    const selectedOption = options.find((option) => option.value === value)
    return selectedOption ? selectedOption?.label : ''
  }

  return (
    <Flex align="center" gap="2" className={className}>
      {label && <BlockLabel name={field}>{label}</BlockLabel>}
      <Controller
        name={field}
        control={form.control}
        render={({ field }) => {
          const { ref, ...rest } = field
          const selectedLabel = findLabel(rest?.value)

          return (
            <Select.Root
              size="1"
              onValueChange={onValueChange ?? field.onChange}
              {...rest}
              {...selectProps}
            >
              <Select.Trigger
                placeholder={placeholder}
                title={tooltip && selectedLabel ? selectedLabel : ''}
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
