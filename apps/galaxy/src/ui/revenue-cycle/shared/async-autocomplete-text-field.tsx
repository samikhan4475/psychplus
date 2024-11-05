'use client'

import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Box,
  Flex,
  Popover,
  ScrollArea,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { type ActionResult } from '@/api'
import { SelectOptionType } from '@/types'
import { cn } from '@/utils'
import { truncateString } from '../utils'

interface AsyncAutoCompleteTextFieldProps {
  placeholder?: string
  disabled?: boolean
  field: string
  valueKey?: string
  className?: string
  truncateText?: number
  fetchDataAction: (search: string) => Promise<ActionResult<SelectOptionType[]>>
}

const AsyncAutoCompleteTextField = ({
  field,
  fetchDataAction,
  className,
  placeholder,
  truncateText,
  disabled = false,
  valueKey = 'value',
}: AsyncAutoCompleteTextFieldProps) => {
  const form = useFormContext()
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState(form.getValues(field))

  const handleSearchService = useDebouncedCallback(async (value: string) => {
    if (value.length < 2) return
    setLoading(true)
    const response = await fetchDataAction(value)
    if (response.state === 'success') {
      setResults(response.data || [])
    } else {
      toast.error('Failed to fetch data. Please try again.')
      setResults([])
    }
    setLoading(false)
  }, 300)

  const renderTrigger = () => (
    <Box
      onClick={() => setOpen(true)}
      className={cn(
        'flex h-7 w-full cursor-pointer items-center justify-between rounded-1 border border-gray-7',
        { 'cursor-not-allowed': disabled },
        className,
      )}
    >
      {form.watch(field) ? (
        <Text className="text-gray-200 px-2 text-1">
          {truncateText ? truncateString(selectedLabel, 10) : selectedLabel}
        </Text>
      ) : (
        <Text className="px-2 text-1 text-gray-9">{placeholder}</Text>
      )}

      <MagnifyingGlassIcon className="mr-2" height="16" width="16" />
    </Box>
  )

  const renderItem = (item: SelectOptionType) => (
    <Box
      key={item.value}
      className="hover:bg-pp-black-1 rounded hover:text-white cursor-pointer px-2 py-1"
      onClick={() => handleSelect(item)}
    >
      <Text size="2">{item.label}</Text>
    </Box>
  )

  const handleSelect = (item: SelectOptionType) => {
    const value = valueKey === 'value' ? item.value : item.label
    form.setValue(field, value)
    setSelectedLabel(item.label)
    setOpen(false)
  }

  return (
    <Controller
      name={field}
      control={form.control}
      render={() => (
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger disabled={disabled}>
            {renderTrigger()}
          </Popover.Trigger>
          <Popover.Content className="shadow-lg rounded-lg bg-white w-full max-w-xs border-0 p-0">
            <Flex className="border-b p-2">
              <TextField.Root
                size="1"
                variant="soft"
                onChange={(e) => handleSearchService(e.target.value)}
                placeholder={placeholder}
                autoFocus
                className="bg-white text-gray-200 w-full border-none outline-none"
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Flex>
            <Separator color="gray" size="4" />
            {loading && (
              <Text size="2" color="gray">
                Loading...
              </Text>
            )}

            {results.length > 0 && (
              <ScrollArea className="max-h-[250px]">
                {results.map(renderItem)}
              </ScrollArea>
            )}
          </Popover.Content>
        </Popover.Root>
      )}
    />
  )
}

export { AsyncAutoCompleteTextField }
