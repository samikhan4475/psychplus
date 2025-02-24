'use client'

import { useCallback, useRef } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import { Button, DropdownMenu, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SelectOptionType } from '@/types'
import { cn } from '@/utils'

interface DropdownSelectProps {
  field: string
  options: SelectOptionType[]
  placeholder?: string
  className?: string
  buttonClassName?: string
  menuClassName?: string
  disabled?: boolean
  shouldDirty?: boolean
  loading?: boolean
}
const DropdownSelect = ({
  options,
  field,
  placeholder = 'Select',
  buttonClassName,
  className,
  menuClassName,
  disabled,
  shouldDirty = false,
  loading,
}: DropdownSelectProps) => {
  const form = useFormContext()
  const ref = useRef<HTMLButtonElement>(null)
  const value = form.watch(field)
  const findLabel = useCallback(
    (value: string) => {
      const selectedOption = options?.find((option) => option?.value === value)
      return selectedOption?.label ? selectedOption?.label : undefined
    },
    [options],
  )

  return (
    <Flex className={cn('flex-1', className)}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          disabled={disabled}
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
              { '!font-light !text-gray-9': !findLabel(value) },
              buttonClassName,
            )}
          >
            {findLabel(value) ?? placeholder}
            <DropdownMenu.TriggerIcon className={cn({ hidden: loading })} />
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
          {options?.map((opt, idx) => (
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
                form.setValue(field, opt?.value, { shouldDirty })
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

export { DropdownSelect }
