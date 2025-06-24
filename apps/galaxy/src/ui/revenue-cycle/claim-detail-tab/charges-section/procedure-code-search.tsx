'use client'

import React, { useCallback, useRef, useState } from 'react'
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
import { CodeItem } from '@/types'
import { cn } from '@/utils'
import { getServiceCPTCodes } from '../actions'

interface SearchProcedureCodesProps {
  placeholder?: string
  disabled?: boolean
  onChange?: (value: CodeItem) => void
  required?: boolean
  fieldName: string
}

const SearchProcedureCodes = ({
  placeholder = 'Search',
  disabled = false,
  onChange,
  required = false,
  fieldName,
}: SearchProcedureCodesProps) => {
  const { control } = useFormContext()
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<CodeItem[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!disabled) setOpen(isOpen)
    },
    [disabled],
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') inputRef.current?.focus()
  }

  const handleDebouncedSearch = useDebouncedCallback(async (value: string) => {
    if (value.length < 2) return
    setLoading(true)
    const response = await getServiceCPTCodes(value)
    if (response.state === 'success') {
      setResults(response.data.serviceCPTData || [])
    } else {
      setResults([])
      toast.error('Error fetching procedure data')
    }
    setLoading(false)
  }, 500)

  const onItemSelect = useCallback(
    (item: CodeItem) => {
      onChange?.(item)
      inputRef.current?.focus()
    },
    [onChange],
  )

  const renderTrigger = (value?: string) => {
    const display = value ? (
      <Text>{value}</Text>
    ) : (
      <Text size="1" className={cn('text-gray-9', { 'text-black': disabled })}>
        {placeholder}
      </Text>
    )

    return (
      <Box
        className={cn(
          'width-full flex w-full cursor-pointer items-center justify-between',
          { 'bg-pp-states-disabled cursor-not-allowed': disabled },
        )}
        onClick={() => handleOpenChange(true)}
      >
        <Flex
          py="2"
          px="2"
          align="center"
          className="h-6 rounded-item [box-shadow:none]"
        >
          <Text size="1"> {display}</Text>
        </Flex>
        <Flex>
          <MagnifyingGlassIcon className="ml-2" height="16" width="16" />
        </Flex>
      </Box>
    )
  }

  const renderItem = (item: CodeItem) => (
    <Box
      key={item.code}
      py="1"
      px="2"
      className={cn(
        'hover:bg-pp-black-1 hover:text-white mx-1 cursor-pointer rounded-1',
        {
          'bg-pp-states-disabled cursor-not-allowed': disabled,
        },
      )}
      onClick={() => onItemSelect(item)}
    >
      <Text size="1">{item.code}</Text>
    </Box>
  )

  return (
    <>
      <input
        ref={inputRef}
        className="pointer-events-none absolute opacity-0"
        onFocus={() => handleOpenChange(!open)}
        tabIndex={0}
      />
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <Popover.Root open={open} onOpenChange={handleOpenChange}>
            <Popover.Trigger disabled={disabled}>
              {renderTrigger(field.value)}
            </Popover.Trigger>
            <Popover.Content className="p-0">
              <Flex className="py-1">
                <TextField.Root
                  size="1"
                  variant="soft"
                  onChange={(e) => handleDebouncedSearch(e.target.value)}
                  placeholder={placeholder}
                  autoFocus
                  onKeyDown={onKeyDown}
                  required={required}
                  disabled={disabled}
                  className="bg-white h-6 flex-1 border-0 outline-none [&>*]:bg-transparent [&>*]:outline-none"
                >
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Flex>

              {loading && (
                <Flex py="4" justify="center">
                  <Text size="2" color="gray" align="center">
                    Loading...
                  </Text>
                </Flex>
              )}
              {!loading && results.length === 0 && (
                <Flex py="4" justify="center">
                  <Text size="2" color="gray" align="center">
                    No results
                  </Text>
                </Flex>
              )}

              <Separator color="gray" size="4" />

              <Flex direction="column" py="1" gap="1">
                <ScrollArea scrollbars="vertical" className="max-h-[100px]">
                  {results.map(renderItem)}
                </ScrollArea>
              </Flex>
            </Popover.Content>
          </Popover.Root>
        )}
      />
    </>
  )
}

export { SearchProcedureCodes }
