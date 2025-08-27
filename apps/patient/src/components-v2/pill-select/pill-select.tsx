'use client'

import React, { useRef } from 'react'
import { cn } from '@psychplus-v2/utils'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Text } from '@radix-ui/themes'
import { Select } from '@psychplus/ui/select'

export interface PillSelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface PillSelectProps {
  options: PillSelectOption[]
  selectedOption?: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  defaultValue?: string
  className?: string
}

export const PillSelect = ({
  options,
  selectedOption,
  onChange,
  placeholder,
  disabled = false,
  defaultValue = '',
  className = '',
  ...props
}: PillSelectProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null)

  const selectedLabel =
    options.find((opt) => opt.value === selectedOption)?.label || placeholder

  return (
    <Select.Root
      size="3"
      value={selectedOption}
      disabled={disabled}
      onValueChange={onChange}
      defaultValue={defaultValue}
      {...props}
    >
      <Select.Trigger
        radius="full"
        ref={triggerRef}
        placeholder={placeholder}
        className={cn(
          'border-pp-gray-4 text-pp-text-color w-full whitespace-nowrap border px-[5px] py-2 font-regular max-sm:h-7 max-xs:h-6 sm:h-8 md:h-8 md:px-[10px] lg:h-10',
          className,
        )}
      >
        {selectedLabel}
        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 transform" />
      </Select.Trigger>

      <Select.Content align="end" position="popper" highContrast>
        {options.map((option) => (
          <Select.Item
            key={option.value}
            value={option.value}
            disabled={option?.disabled}
          >
            <Text className="text-2 md:text-4">{option.label}</Text>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
