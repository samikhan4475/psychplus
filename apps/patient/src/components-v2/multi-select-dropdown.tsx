'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { cn } from '@psychplus-v2/utils'
import { Cross2Icon, TriangleDownIcon } from '@radix-ui/react-icons'
import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer } from './form'

interface Option {
  display: string
  value: string
}

interface MultiSelectDropdownProps {
  name: string
  options: Option[]
  disabled?: boolean
  className?: string
  showOptionsAtBottom?: boolean
  shouldTrigger?: boolean
}

const MultiSelectDropdown = ({
  name,
  options,
  disabled,
  className,
  showOptionsAtBottom = false,
  shouldTrigger = false,
}: MultiSelectDropdownProps) => {
  const form = useFormContext()
  const [searchValue, setSearchValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const ref = useOnclickOutside(() => setShowOptions(false))

  const isFormDisabled = form.formState.disabled
  const selected: string[] = form.watch(name) ?? []

  const addValue = useCallback(
    (value: string) => {
      form.setValue(name, [...selected, value], {
        shouldValidate: shouldTrigger,
      })
    },
    [selected, form, name, shouldTrigger],
  )

  const removeValue = useCallback(
    (value: string) => {
      form.setValue(
        name,
        selected.filter((v) => v !== value),
        {
          shouldValidate: shouldTrigger,
        },
      )
    },
    [selected, form, name, shouldTrigger],
  )

  const filteredOptions = useMemo(() => {
    const search = searchValue.trim().toLowerCase()
    return options.filter(
      (opt) =>
        opt.display.toLowerCase().includes(search) &&
        !selected.includes(opt.value),
    )
  }, [searchValue, options, selected])

  useEffect(() => {
    if (selected.length === options.length) {
      setShowOptions(false)
    }
  }, [selected, options.length])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Backspace' &&
      searchValue === '' &&
      selected.length > 0 &&
      !disabled &&
      !isFormDisabled
    ) {
      removeValue(selected[selected.length - 1])
    }
  }

  const isInputDisabled = disabled ?? isFormDisabled

  return (
    <FormFieldContainer
      className={cn('min-w-96 w-auto max-xs:min-w-full', className)}
    >
      <Box ref={ref} className="relative">
        <Flex
          align="center"
          gap="1"
          className={cn(
            'cursor-pointer flex-wrap overflow-y-auto rounded-6 border border-gray-7 p-1.5',
            isInputDisabled && 'bg-gray-3 text-gray-11',
          )}
        >
          {selected.map((value) => {
            const option = options.find((opt) => opt.value === value)
            return (
              <Flex
                key={value}
                align="center"
                gap="1"
                className="bg-pp-table-border mt-1 whitespace-nowrap rounded-6"
                px="2"
                py="1"
              >
                <Text size="1" weight="medium">
                  {option?.display ?? value}
                </Text>
                <Cross2Icon
                  onClick={() => !isInputDisabled && removeValue(value)}
                  className={cn(
                    'text-gray-11 hover:text-gray-12',
                    isInputDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
                  )}
                />
              </Flex>
            )
          })}

          <Flex
            className="flex-1 cursor-pointer items-center bg-transparent px-1"
            onClick={() =>
              selected.length < options.length && setShowOptions(true)
            }
          >
            <input
              placeholder={
                selected.length === options.length ? '' : '--Please Select--'
              }
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isInputDisabled ?? selected.length === options.length}
              className={cn(
                'flex-1 cursor-pointer border-none bg-transparent p-1 py-0.5 text-[14px] text-gray-11 outline-none',
              )}
            />
            <TriangleDownIcon
              width={20}
              height={20}
              className="text-black pointer-events-none z-50 ml-1"
            />
          </Flex>
        </Flex>

        {showOptions && (
          <ScrollArea
            className={cn(
              'bg-white !absolute z-50 mx-auto mt-1 h-auto max-h-52 w-full rounded-1 p-2 shadow-3',
              showOptionsAtBottom ? 'top-full' : 'bottom-full',
            )}
          >
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((option) => (
                <Flex
                  key={option.value}
                  gap="2"
                  className="cursor-pointer rounded-2 px-3 py-2 hover:bg-gray-3"
                  onClick={() => addValue(option.value)}
                >
                  <Text size="2" weight="medium">
                    {option.display}
                  </Text>
                </Flex>
              ))
            ) : (
              <Flex
                className="items-center justify-center px-3 py-2 text-gray-11"
                style={{ minHeight: '2rem' }}
              >
                <Text size="2" weight="medium">
                  No options found
                </Text>
              </Flex>
            )}
          </ScrollArea>
        )}
      </Box>
    </FormFieldContainer>
  )
}

export { MultiSelectDropdown }
