'use client'

import { ReactNode } from 'react'
import { cn } from '@psychplus-v2/utils'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

type ToggleOption = {
  value: string
  label: string
  icon?: ReactNode
}

interface PillToggleListProps {
  options: ToggleOption[]
  value: string
  onChange: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  className?: string
  itemClassName?: string
}

const getToggleItemClass = (isHorizontal: boolean): string =>
  cn(
    'text-sm font-medium transition-colors focus:outline-none',
    'flex items-center gap-2 px-4 py-2',
    'rounded-[100px] border border-pp-gray-2',
    'bg-transparent text-gray-700',
    'data-[state=on]:bg-pp-blue-3 data-[state=on]:text-white data-[state=on]:border-pp-blue-3',
    { 'mb-3': isHorizontal },
  )

export function PillToggleList({
  options,
  value,
  onChange,
  orientation = 'horizontal',
  className,
  itemClassName,
}: PillToggleListProps) {
  const isHorizontal = orientation === 'horizontal'

  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(val) => {
        if (val) {
          onChange(val)
        }
      }}
      orientation={orientation}
      className={cn(
        'flex flex-wrap',
        { 'gap-x-3': isHorizontal, 'flex-col gap-y-2': !isHorizontal },
        className,
      )}
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={option.value}
          value={option.value}
          className={cn(getToggleItemClass(isHorizontal), itemClassName)}
        >
          {option.icon && <span className="h-4 w-4">{option.icon}</span>}
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
