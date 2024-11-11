'use client'

import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError, NumberInput } from '@/components'
import { BlockDescription } from '@/components/block-description'
import { cn } from '@/utils'

interface RadioSelectInputProps {
  label?: string
  description?: React.ReactNode
  field: string
  options: RadioSelectInputOption[]
  required?: boolean
}

interface RadioSelectInputOption {
  label: string
  value: string
  min?: number
  max?: number
}

const RadioSelectInput = ({
  label,
  description,
  field,
  options,
  required,
}: RadioSelectInputProps) => {
  const form = useFormContext()
  const selectedValue = form.watch(field)

  return (
    <Flex align="start" justify="start" gap="2">
      {label && <BlockLabel required={required}>{label}</BlockLabel>}
      {description && <BlockDescription>{description}</BlockDescription>}
      <RadioGroup.Root
        onValueChange={(value) => {
          form.setValue(field, value)
        }}
        value={selectedValue}
        className="flex gap-1.5"
      >
        {options.map((option) => {
          const isSelected = selectedValue === option.value
          const id = `${label}-radio-${option.value}`

          return (
            <Flex key={option.value} align="center" gap="1">
              <Text
                as="label"
                htmlFor={id}
                className={cn(
                  'flex h-[var(--chip-height)] cursor-pointer items-center rounded-1 border border-gray-7 px-1',
                  {
                    'border-pp-focus-outline bg-pp-focus-bg': isSelected,
                  },
                )}
              >
                <RadioGroup.Item
                  className="rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:bg-blue-11"
                  value={option.value}
                  id={id}
                >
                  <RadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
                </RadioGroup.Item>
                <Text
                  ml="1"
                  className={cn('cursor-pointer text-[11px]', {
                    'font-medium': isSelected,
                  })}
                >
                  {option.label}
                </Text>
              </Text>

              {isSelected && (
                <>
                  <NumberInput
                    field={option.value}
                    className="w-[35px]"
                    autoFocus
                    format="##"
                  />
                  <FormFieldError name={option.value} />
                </>
              )}
            </Flex>
          )
        })}
      </RadioGroup.Root>
    </Flex>
  )
}

export { RadioSelectInput }
