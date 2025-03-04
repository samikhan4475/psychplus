'use client'

import { useCallback, useMemo, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import {
  Box,
  Checkbox,
  Flex,
  ScrollArea,
  Text,
  TextField,
} from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components'
import { cn } from '@/utils'

interface MuliSelectChipDropdownProps {
  name: string
  options: {
    display: string
    value: string
  }[]
  disabled?: boolean
  className?: string
  showOptionsAtBottom?: boolean
  shouldTrigger?: boolean
}

const MultiSelectChipDropdown = ({
  name,
  options,
  disabled,
  className,
  showOptionsAtBottom = false,
  shouldTrigger = false,
}: MuliSelectChipDropdownProps) => {
  const form = useFormContext()
  const [searchValue, setSearchValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const isDisabled = form.formState.disabled
  const selected: string[] = form.watch(name)

  const addValue = useCallback(
    (value: string) => {
      const newValue = [...selected, value]
      form.setValue(name, newValue)
      shouldTrigger && form.trigger(name)
    },
    [selected, form, name, shouldTrigger],
  )

  const removeValue = useCallback(
    (value: string) => {
      const newValue = selected.filter((item) => item !== value)
      form.setValue(name, newValue)
      shouldTrigger && form.trigger(name)
    },
    [selected, form, name, shouldTrigger],
  )

  const filteredOptions = useMemo(() => {
    const normalizedSearchValue = searchValue.trim().toLowerCase()

    return options.filter((option) =>
      option.display.toLowerCase().includes(normalizedSearchValue),
    )
  }, [searchValue, options])

  const ref = useOnclickOutside(() => {
    setShowOptions(false)

    if (!searchValue) {
      return
    }
  })

  return (
    <FormFieldContainer className={`min-w-96 w-auto ${className}`}>
      <Box ref={ref} className="relative">
        <Flex
          className={cn(
            'flex-wrap overflow-y-auto rounded-2 border border-gray-7',
            disabled && 'bg-gray-3 text-gray-11' && 'bg-gray-3 text-gray-11',
          )}
          align="center"
          gap="1"
          pl="1"
        >
          {selected?.map((item: string) => (
            <Flex
              key={item}
              className="bg-pp-table-border mt-1 whitespace-nowrap rounded-6"
              align="center"
              px="1"
            >
              <Text size="1" weight="medium">
                {options.find((options) => options.value === item)?.display}
              </Text>
              <Cross2Icon
                onClick={() => !disabled && !isDisabled && removeValue(item)}
                className={cn('cursor-pointer', {
                  'cursor-not-allowed': disabled || isDisabled,
                })}
              />
            </Flex>
          ))}
          <TextField.Root
            style={
              {
                '--text-field-border-width': '0px',
              } as React.CSSProperties
            }
            size="1"
            className="min-w-14 !outline-white flex-1 [box-shadow:none]"
            placeholder="Search by keyword"
            disabled={disabled}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={() => setShowOptions(true)}
          />
        </Flex>
        {showOptions ? (
          <ScrollArea
            className={`bg-white !absolute ${
              showOptionsAtBottom ? 'top' : 'bottom'
            }-full z-50 mx-auto h-auto max-h-32 w-full rounded-4 p-2 shadow-3`}
          >
            {filteredOptions.map((option) => {
              return (
                <Text
                  key={option.value}
                  as="label"
                  size="2"
                  className="cursor-pointer"
                >
                  <Flex
                    gap="2"
                    className={cn(
                      selected?.includes(option.value) && 'bg-red-1',
                    )}
                  >
                    <Checkbox
                      highContrast
                      checked={selected?.includes(option.value)}
                      onCheckedChange={(checked) => {
                        checked
                          ? addValue(option.value)
                          : removeValue(option.value)
                      }}
                    />
                    {option.display}
                  </Flex>
                </Text>
              )
            })}
          </ScrollArea>
        ) : null}
      </Box>
    </FormFieldContainer>
  )
}

export { MultiSelectChipDropdown }
