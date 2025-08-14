'use client'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { Text } from '@radix-ui/themes'
import { SelectOptionType } from '@/types'
import { cn } from '@/utils'

interface RadioGroupProps {
  options: SelectOptionType[]
  className?: string
  defaultValue?: string
  onValueChange: (value: string) => void
  wrapperClassName?: string
  disabled?: boolean
}

// This component will work without Form Context
const CellRadioGroup = ({
  options,
  className,
  defaultValue,
  onValueChange,
  wrapperClassName,
  disabled = false,
}: RadioGroupProps) => {
  return (
    <RadixRadioGroup.Root
      onValueChange={onValueChange}
      value={defaultValue}
      className={cn('flex gap-1.5', wrapperClassName)}
      disabled={disabled}
    >
      {options.map((option) => {
        const isSelected = defaultValue === option.value
        const id = `radio-option-${option.value}`

        return (
          <Text
            key={option.value}
            as="label"
            htmlFor={id}
            className={cn(
              'flex h-[var(--chip-height)] cursor-pointer items-center rounded-1 px-1',
              {
                'border-pp-focus-outline bg-pp-focus-bg': isSelected,
              },
              className,
            )}
          >
            <RadixRadioGroup.Item
              className="rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:bg-blue-11"
              value={option.value}
              id={id}
            >
              <RadixRadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
            </RadixRadioGroup.Item>
            <Text
              ml="1"
              className={cn('cursor-pointer text-[11px]', {
                'font-medium': isSelected,
              })}
            >
              {option.label}
            </Text>
          </Text>
        )
      })}
    </RadixRadioGroup.Root>
  )
}

export { CellRadioGroup }
