'use client'

import React, { useEffect, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Flex, Popover, Select, Text, TextFieldInput } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { cn } from '@psychplus/ui/cn'
import { useCodesetCodes } from '@/providers'

interface CodesetFormSelectProps
  extends React.ComponentProps<typeof Select.Root> {
  name: string
  codeset: string
  exclude?: string[]
  placeholder?: string
  groupingCodes?: string[]
}

const CodesetFormMultipleSelect = ({
  name,
  codeset,
  exclude,
  placeholder,
  groupingCodes,
  ...selectProps
}: CodesetFormSelectProps) => {
  const form = useFormContext()
  const codes = useCodesetCodes(codeset)

  const [selectedItems, setSelectedItems] = useState<string[]>(
    form.getValues(name),
  )

  const items = groupingCodes
    ? codes.filter((item) =>
        groupingCodes?.some((code) => item.groupingCode?.startsWith(code)),
      )
    : codes

  const [searchValue, setSearchValue] = useState('')

  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    if (!searchValue) setFilteredItems(items)
    else
      setFilteredItems(
        items.filter((item) =>
          item.display.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      )
  }, [searchValue])

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        const { ref, ...rest } = field

        return (
          <Popover.Root {...rest} {...selectProps}>
            <Popover.Trigger
              className={cn({
                'cursor-not-allowed': selectProps.disabled,
              })}
              onClick={(e) => {
                if (selectProps.disabled) {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}
            >
              <Flex
                className={cn(
                  'max-h-60 min-h-[40px] flex-wrap overflow-y-auto rounded-6 border border-gray-7',
                  selectProps.disabled && 'bg-gray-3 text-gray-11',
                )}
                px="3"
                py="2"
                align="center"
              >
                <Text weight="medium" className="cursor-pointer">
                  {form.getValues(name).length === 0 && placeholder}
                </Text>

                {selectedItems.map((item) => (
                  <Flex
                    key={item}
                    className="whitespace-nowrap rounded-6 border border-[#194595] bg-[#D9E2FC]"
                    align="center"
                    gap="2"
                    px="4"
                    m="1"
                  >
                    {items.find((code) => code.value === item)?.display}

                    <Cross2Icon
                      onClick={() => {
                        setSelectedItems(
                          selectedItems.filter(
                            (selectedItem) => selectedItem !== item,
                          ),
                        )

                        field.onChange(
                          selectedItems.filter(
                            (selectedItem) => selectedItem !== item,
                          ),
                        )
                      }}
                      className="cursor-pointer"
                    />
                  </Flex>
                ))}
              </Flex>
            </Popover.Trigger>
            <Popover.Content align="center">
              <>
                <TextFieldInput
                  placeholder="Search by keyword"
                  disabled={selectProps.disabled}
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value)
                  }}
                />

                <Flex
                  direction="column"
                  className="max-h-[300px] bg-[#FFF]"
                  mt="2"
                >
                  {filteredItems.length > 0 ? (
                    filteredItems
                      .filter(
                        (code) =>
                          !exclude?.includes(code.value) &&
                          !selectedItems.includes(code.value),
                      )
                      .map((code) => (
                        <Text
                          key={code.value}
                          onClick={() => {
                            setSelectedItems([...selectedItems, code.value])
                            field.onChange([...selectedItems, code.value])
                          }}
                          className="cursor-pointer px-4 py-1 hover:h-10 hover:rounded-3 hover:bg-[#151B4A] hover:text-[white]"
                        >
                          {code.display}
                        </Text>
                      ))
                  ) : (
                    <Text size="2" color="gray" align="center" mt="3">
                      No results
                    </Text>
                  )}
                </Flex>
              </>
            </Popover.Content>
          </Popover.Root>
        )
      }}
    />
  )
}
export { CodesetFormMultipleSelect }
