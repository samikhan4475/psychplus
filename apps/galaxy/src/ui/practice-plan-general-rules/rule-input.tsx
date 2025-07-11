'use client'

import React from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { Flex, Select, Switch, Text } from '@radix-ui/themes'
import { cn } from '@/utils'
import { PracticePlanInputType } from './constants'
import { EnrichedRule } from './types'
import { parseDropdownOptions } from './utils'

interface RuleInputProps {
  rule: Partial<EnrichedRule>
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const RuleInput = ({ rule, value, onChange, disabled }: RuleInputProps) => {
  const attributes = rule.attributes ?? []

  const typeAttr = attributes.find((attr) => attr.name === 'TYPE')?.value
  const valuesAttr = attributes.find((attr) => attr.name === 'VALUES')?.value

  if (!typeAttr || !valuesAttr) {
    return <Text size="1">{value}</Text>
  }

  const typeParts = typeAttr.split('|')
  const valuesParts = valuesAttr.split('|')

  const isCompoundDropdown = typeParts.length > 1
  const currentValueParts = value?.split('|') ?? []

  const renderToggle = () => (
    <Flex align="center" gap="2">
      <Text size="1" className="opacity-60">
        No
      </Text>
      <Switch
        disabled={disabled}
        size="1"
        color="green"
        checked={value === 'Yes'}
        onClick={() => onChange(value === 'Yes' ? 'No' : 'Yes')}
      />
      <Text size="1">Yes</Text>
    </Flex>
  )

  const renderDropdowns = () => {
    if (isCompoundDropdown) {
      return (
        <Flex gap="4" align="center">
          {typeParts.map((_, idx) => {
            const options = parseDropdownOptions(valuesParts[idx] ?? '')
            const selected = currentValueParts[idx] ?? ''
            const name = `${rule.code}_${idx}`

            return (
              <Select.Root
                key={name}
                value={selected}
                disabled={disabled}
                size="1"
                onValueChange={(val) => {
                  const updated = [...currentValueParts]
                  updated[idx] = val
                  onChange(updated.join('|'))
                }}
              >
                <Select.Trigger
                  className="h-[var(--chip-height)] min-w-[50px] overflow-y-auto"
                  variant="surface"
                />
                <Select.Content position="popper" align="center" highContrast>
                  {options.map((option) => (
                    <Select.Item key={option} value={option}>
                      {option}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )
          })}
        </Flex>
      )
    }

    const options = parseDropdownOptions(valuesParts[0] ?? '')
    return (
      <Select.Root
        disabled={disabled}
        value={value}
        onValueChange={onChange}
        size="1"
      >
        <Select.Trigger className="h-[var(--chip-height)] min-w-[50px]" />
        <Select.Content position="popper" align="center" highContrast>
          {options.map((option) => (
            <Select.Item key={option} value={option}>
              {option}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    )
  }

  const renderRadioButtons = () => {
    let options = valuesParts
    if (valuesParts.length > 1) {
      options = valuesParts
    } else if (valuesParts[0].includes('/')) {
      options = valuesParts[0].split('/')
    }

    return (
      <RadixRadioGroup.Root
        value={value}
        disabled={disabled}
        onValueChange={onChange}
        className="flex gap-1.5"
      >
        {options.map((option) => {
          const id = `radio-option-${rule.code}-${option}`

          return (
            <Text
              key={option}
              as="label"
              htmlFor={id}
              className={cn(
                'flex h-[var(--chip-height)] cursor-pointer items-center rounded-1 border border-gray-7 px-1',
                {
                  'border-pp-focus-outline bg-pp-focus-bg': value === option,
                },
              )}
            >
              <RadixRadioGroup.Item
                id={id}
                disabled={disabled}
                value={option}
                className="rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:bg-blue-11"
              >
                <RadixRadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
              </RadixRadioGroup.Item>
              <Text
                ml="1"
                className={cn('cursor-pointer text-[11px]', {
                  'font-medium': value === option,
                })}
              >
                {option}
              </Text>
            </Text>
          )
        })}
      </RadixRadioGroup.Root>
    )
  }

  switch (typeParts[0]) {
    case PracticePlanInputType.Toggle:
      return renderToggle()
    case PracticePlanInputType.DropDown1:
    case PracticePlanInputType.DropDown2:
      return renderDropdowns()
    case PracticePlanInputType.RadioButtons:
      return renderRadioButtons()
    default:
      return <Text size="1">{value}</Text>
  }
}

export { RuleInput }
