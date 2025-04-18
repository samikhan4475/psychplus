'use client'

import { Flex, Select } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { BlockLabel } from './block-label'
import { FormFieldError } from './form'

interface SelectInputProps<T> extends React.ComponentProps<typeof Select.Root> {
  label?: string
  field?: string
  options?: { label: string; value: T; disabled?: boolean }[]
  placeholder?: string
  buttonClassName?: string
  className?: string
  tooltip?: boolean
  required?: boolean
  loading?: boolean
  showError?: boolean
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
  required,
  loading,
  disabled,
  showError = false,
  ...selectProps
}: SelectInputProps<T>) => {
  const form = useFormContext()
  const items = options.map((option) => (
    <Select.Item
      key={option.value}
      value={option.value}
      disabled={option.disabled}
    >
      {option.label}
    </Select.Item>
  ))

  const findLabel = (value: T) => {
    const selectedOption = options.find((option) => option.value === value)
    return selectedOption ? selectedOption.label : ''
  }

  return (
    <Flex align="center" gap="2" className={className}>
      {label && (
        <BlockLabel name={field} required={required}>
          {label}
        </BlockLabel>
      )}
      <Controller
        name={field ?? ''}
        control={form.control}
        render={({ field }) => {
          const { ref, ...rest } = field
          const selectedLabel = findLabel(rest?.value)

          return (
            <Select.Root
              size="1"
              onValueChange={onValueChange ?? field.onChange}
              disabled={disabled || loading}
              {...rest}
              {...selectProps}
            >
              <Select.Trigger
                placeholder={placeholder}
                title={tooltip && selectedLabel ? selectedLabel : ''}
                className={cn(
                  'h-[var(--chip-height)] overflow-y-auto ',
                  buttonClassName,
                  {
                    'loading hide-default-select-icon relative overflow-x-hidden':
                      loading,
                  },
                )}
                variant="surface"
              />
              <Select.Content position="popper" align="center" highContrast>
                {options.length > 0 ? (
                  items
                ) : (
                  <Select.Item
                    value="no-data"
                    disabled
                    className="bg-white h-6 justify-center p-0 text-center text-1"
                  >
                    No data
                  </Select.Item>
                )}
              </Select.Content>
            </Select.Root>
          )
        }}
      />
      {field && showError && <FormFieldError name={field} />}
    </Flex>
  )
}

export { SelectInput }
