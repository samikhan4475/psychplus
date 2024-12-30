'use client'

import React, { useEffect, useState } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SelectedIndicator } from '@/ui/mse/mse-widget/select-indicotor'
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
  disableOtherOptions?: boolean
  lastOptionIndicator?: boolean
  resetOnSameValue?: boolean
  optionEnableTag?: string
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
  disableOtherOptions = false, // Default to false
  optionEnableTag,
  lastOptionIndicator = false,
  resetOnSameValue = false,
}: RadioSelectSectionProps) => {
  const form = useFormContext()
  const watchedValue = form.watch(field)
  const [value, setValue] = useState<string | undefined>(defaultValue || '')

  useEffect(() => {
    if (disabled) {
      setValue(defaultValue)
    }
    setValue(watchedValue || '')
  }, [watchedValue, defaultValue, disabled])

  const handleOptionClick = (clickedValue: string) => {
    if (resetOnSameValue && value === clickedValue && value !== '') {
      form.setValue(field, '', { shouldDirty: true })
    } else if (!disabled) {
      form.setValue(field, clickedValue, { shouldDirty: true })
    }
    if (onChange) onChange(clickedValue)
  }

  const isLastOptionSelected = value === options[options.length - 1]?.value

  return (
    <Flex align="start" justify="start" gap="2">
      {label && <BlockLabel required={required}>{label}</BlockLabel>}
      {description && <BlockDescription>{description}</BlockDescription>}
      <Flex position="relative" align="center">
        <RadioGroup.Root
          onValueChange={handleOptionClick}
          value={value}
          className="flex gap-1.5"
        >
          {options.map((option) => {
            const isSelected = value === option.value && className
            const id = `${field}-radio-${option.value}`
            const shouldDisable =
              disableOtherOptions && option.value !== optionEnableTag
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
                    'bg-gray-200 cursor-not-allowed opacity-60': shouldDisable,
                  },
                  { 'cursor-pointer': !disabled && !shouldDisable },
                )}
              >
                <RadioGroup.Item
                  className="rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:bg-blue-11"
                  value={option.value}
                  id={id}
                  disabled={disabled || shouldDisable}
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
                    { 'cursor-pointer': !disabled && !shouldDisable },
                  )}
                >
                  {option.label}
                </Text>
              </Text>
            )
          })}
        </RadioGroup.Root>
        {isLastOptionSelected && lastOptionIndicator && <SelectedIndicator />}
      </Flex>
    </Flex>
  )
}
export { RadioSelectSection }
