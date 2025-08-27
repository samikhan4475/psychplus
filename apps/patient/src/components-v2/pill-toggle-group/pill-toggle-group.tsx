'use client'

import { cn } from '@psychplus-v2/utils'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Box } from '@radix-ui/themes'
import { PillToggleGroupProps, ToggleOption } from './types'

const getStyleString = (value: string, option: ToggleOption) =>
  cn(
    'text-sm flex items-center gap-2 px-4 py-2 font-medium transition-colors focus:outline-none rounded-[100px]',
    'bg-transparent text-gray-700 w-[125px]',
    {
      'bg-pp-blue-3 text-white ': value === option.value,
    },
  )

export function PillToggleGroup({
  options,
  value,
  onChange,
  className,
  itemClassName,
}: PillToggleGroupProps) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(val) => {
        if (val) onChange(val)
      }}
      className={cn(
        'border-pp-gray-2 bg-white inline-flex items-center rounded-[100px] border',
        className,
      )}
    >
      {options.map((option) => (
        <ToggleGroup.Item key={option.value} value={option.value}>
          <Box className={cn(getStyleString(value, option), itemClassName)}>
            {option.icon && <span className="h-4 w-4">{option.icon}</span>}
            {option.label}
          </Box>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
