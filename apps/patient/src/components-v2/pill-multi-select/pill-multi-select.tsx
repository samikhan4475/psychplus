'use client'

import React, { useRef } from 'react'
import { cn } from '@psychplus-v2/utils'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import * as Popover from '@radix-ui/react-popover'
import { Button, ScrollArea, Text } from '@radix-ui/themes'

export interface PillSelectOption {
  label: string
  value: string
}

interface PillMultiSelectProps {
  options: PillSelectOption[]
  selectedOptions: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const PillMultiSelect = ({
  options,
  selectedOptions,
  onChange,
  placeholder = '',
  disabled = false,
  className = '',
}: PillMultiSelectProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null)

  const toggleOption = (value: string) => {
    if (selectedOptions.includes(value)) {
      onChange(selectedOptions.filter((v) => v !== value))
    } else {
      onChange([...selectedOptions, value])
    }
  }

  const selectedLabels =
    options
      .filter((opt) => selectedOptions.includes(opt.value))
      .map((opt) => opt.label)
      .join(', ') || placeholder

  const isPlaceHolder = selectedOptions.length === 0

  return (
    <Popover.Root>
      <Popover.Trigger asChild className="w-full">
        <Button
          size="3"
          color="gray"
          ref={triggerRef}
          disabled={disabled}
          radius="full"
          variant="outline"
          className={cn(
            '!border-pp-gray-4 lg:h-10, text-pp-text-color w-full justify-between overflow-hidden text-ellipsis whitespace-nowrap border px-[5px] py-2 text-[14px] font-regular hover:bg-transparent max-sm:h-7 max-xs:h-6 sm:h-8 md:h-8 md:px-[10px]',
            {
              'text-pp-placeholder': isPlaceHolder,
            },
            className,
          )}
          aria-haspopup="listbox"
          aria-expanded="false"
        >
          <Text
            as="span"
            className="flex-shrink overflow-hidden truncate whitespace-nowrap text-left text-[14px]"
            size="2"
          >
            {selectedLabels}
          </Text>
          <ChevronDownIcon className="h-[18px] w-[18px] flex-shrink-0" />
        </Button>
      </Popover.Trigger>

      <Popover.Content
        align="end"
        sideOffset={5}
        className="bg-white shadow-lg border-pp-gray-4 z-50 mt-2 w-full rounded-4 border py-2"
      >
        <ScrollArea
          type="always"
          scrollbars="vertical"
          style={{
            height: 380,
            minWidth: 300,
            width: 'auto',
            paddingRight: '8px',
            gap: '6px',
          }}
        >
          {options.map((option, index) => {
            const isSelected = selectedOptions.includes(option.value)
            const isFirst = index === 0
            const isLast = index === options.length - 1
            return (
              <Button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                variant="ghost"
                size="1"
                radius="medium"
                className={cn(
                  'text-pp-text-color hover:bg-pp-blue-8 hover:text-white mx-2 flex w-[92%] cursor-pointer items-center justify-start gap-2 text-left text-[14px]',
                  { 'mt-1': isFirst },
                  { 'mb-1': isLast },
                )}
                aria-pressed={isSelected}
              >
                <CheckIcon
                  className={`font-medium ${
                    isSelected ? 'visible' : 'invisible'
                  }`}
                />

                <Text size="3" className="text-2 md:text-4">
                  {option.label}
                </Text>
              </Button>
            )
          })}
        </ScrollArea>
      </Popover.Content>
    </Popover.Root>
  )
}
