'use client'

import { useCallback, useRef } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import { Button, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { SelectOptionType } from '@/types'
import { cn } from '@/utils'

interface SimpleSelectProps {
  options: SelectOptionType[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  buttonClassName?: string
  menuClassName?: string
  disabled?: boolean
  loading?: boolean
  exclude?: string[]
}

const SimpleSelect = ({
  options,
  value,
  onValueChange,
  placeholder = 'Select',
  buttonClassName,
  menuClassName,
  disabled = false,
  loading = false,
  exclude = [],
}: SimpleSelectProps) => {
  const ref = useRef<HTMLButtonElement>(null)

  const findLabel = useCallback(
    (value: string) => {
      const selectedOption = options?.find((option) => option?.value === value)
      return selectedOption?.label ?? undefined
    },
    [options],
  )

  const filteredOptions = options?.filter((option) => !exclude.includes(option.value)) || []

  return (
    <Flex className="flex-1">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          disabled={disabled || loading}
          className={cn({
            'loading hide-default-select-icon relative overflow-x-hidden':
              loading,
          })}
        >
          <Button
            variant="outline"
            color="gray"
            size="1"
            ref={ref}
            className={cn(
              'border-pp-gray-2 text-pp-black-1 h-6 w-full justify-between border border-solid !text-1 font-regular !outline-none [box-shadow:none] hover:bg-transparent focus:bg-transparent disabled:!pointer-events-none disabled:!bg-gray-3 disabled:!text-gray-11 aria-expanded:bg-transparent',
              { '!font-light !text-gray-9': !findLabel(value ?? '') },
              buttonClassName,
            )}
            title={findLabel(value ?? '') ?? undefined}
          >
            <Text className="truncate">{findLabel(value ?? '') ?? placeholder}</Text>
            <DropdownMenu.TriggerIcon
              className={cn('!min-w-4', { hidden: loading })}
            />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          size="1"
          highContrast
          className={cn('group min-w-max', menuClassName)}
          align="center"
          style={{
            width: ref?.current?.clientWidth,
          }}
        >
          {filteredOptions?.map((opt, idx) => (
            <DropdownMenu.Item
              key={`${opt?.value}-${idx}`}
              disabled={opt?.disabled}
              className={cn(
                'group-hover:bg-white group-hover:text-black hover:!text-white hover:!bg-pp-black-1  data-[disabled]:!bg-white text-1 data-[disabled]:!text-grayA-8',
                {
                  'text-white bg-pp-black-1': opt?.value === value,
                },
              )}
              onSelect={() => {
                if (onValueChange) {
                  onValueChange(opt.value)
                }
              }}
            >
              <Flex justify="start" align="center" px="3" position="relative">
                <CheckIcon
                  className={cn('invisible absolute -left-1.5 top-0', {
                    visible: opt?.value === value,
                  })}
                />
                {opt?.label}
              </Flex>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}

export { SimpleSelect }
