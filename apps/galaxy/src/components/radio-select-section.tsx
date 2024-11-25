'use client'

import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { BlockDescription } from './block-description'
import { BlockLabel } from './block-label'

interface RadioSelectSectionProps {
  label?: string
  description?: React.ReactNode
  field: string
  options: RadioSelectOption[]
  required?: boolean
  className?: string
  disabled?: boolean
  defaultValue?: string
  onChange?: (value: string) => void
  resetOnSameValue?: boolean
}

interface RadioSelectOption {
  label: string
  value: string
}

const RadioSelectSection = ({
  label,
  description,
  field,
  options,
  required,
  className = 'rounded-1 border border-gray-7', // in some cases we don't need border
  disabled = false,
  defaultValue,
  onChange,
  resetOnSameValue = false,
}: RadioSelectSectionProps) => {
  const form = useFormContext()

  const value = disabled ? defaultValue : form.watch(field)

  const handleOptionClick = (clickedValue: string) => {
    if (resetOnSameValue && value === clickedValue && value !== '') {
      form.setValue(field, '')
    } else if (!disabled) {
      form.setValue(field, clickedValue)
    }
    if (onChange) onChange(clickedValue)
  }

  return (
    <Flex align="start" justify="start" gap="2">
      {label && <BlockLabel required={required}>{label}</BlockLabel>}
      {description && <BlockDescription>{description}</BlockDescription>}
      <RadioGroup.Root value={value} className="flex gap-1.5">
        {options.map((option) => {
          const isSelected = value === option.value && className
          const id = `${field}-radio-${option.value}`

          return (
            <Text
              key={option.value}
              as="label"
              htmlFor={id}
              className={cn(
                'flex h-[var(--chip-height)] items-center px-1',
                className,
                {
                  'border-pp-focus-outline bg-pp-focus-bg': isSelected,
                },
                { 'cursor-pointer': !disabled },
              )}
            >
              <RadioGroup.Item
                className="rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:bg-blue-11"
                value={option.value}
                id={id}
                disabled={disabled}
                onClick={() => {
                  handleOptionClick(option.value)
                }}
              >
                <RadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
              </RadioGroup.Item>
              <Text
                ml="1"
                className={cn(
                  'text-[11px]',
                  {
                    'font-medium': isSelected,
                  },
                  { 'cursor-pointer': !disabled },
                )}
              >
                {option.label}
              </Text>
            </Text>
          )
        })}
      </RadioGroup.Root>
    </Flex>
  )
}

export { RadioSelectSection }
