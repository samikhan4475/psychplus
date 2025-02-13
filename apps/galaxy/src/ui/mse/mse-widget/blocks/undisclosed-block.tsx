'use client'

import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockDescription } from '@/components/block-description'
import { BlockLabel } from '@/components/block-label'
import { cn } from '@/utils'

interface UnDisclosedBlockProps {
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
  errorField?: string
}

interface RadioSelectOption {
  label: string
  value: string
}

const UnDisclosedBlock = ({
  label,
  description,
  field,
  options,
  required,
  className = 'rounded-1 border border-gray-7',
  disabled = false,
}: UnDisclosedBlockProps) => {
  const form = useFormContext()
  const watchedValue = form.watch(field)?.[0] || ''

  const error = form?.formState?.errors?.[field]?.message

  const handleOptionClick = (clickedValue: string) => {
    form.setValue(field, clickedValue ? [clickedValue] : [], {
      shouldDirty: true,
    })
  }

  return (
    <Flex align="start" justify="start" gap="2">
      {label && <BlockLabel required={required}>{label}</BlockLabel>}
      {description && <BlockDescription>{description}</BlockDescription>}
      <Flex position="relative" align="center">
        <RadioGroup.Root
          onValueChange={handleOptionClick}
          value={watchedValue}
          className="flex gap-1.5"
        >
          {options.map((option) => {
            const isSelected = watchedValue === option.value && className
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
                    'border border-tomato-11': error,
                  },
                  { 'cursor-pointer': !disabled },
                )}
              >
                <RadioGroup.Item
                  className="rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[disabled]:cursor-not-allowed data-[state=checked]:bg-blue-11"
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
    </Flex>
  )
}
export { UnDisclosedBlock }
