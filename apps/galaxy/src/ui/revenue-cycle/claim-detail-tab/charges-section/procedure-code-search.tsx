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

  const handleSearchService = useDebouncedCallback(async (value: string) => {
    if (value.length < 2) return
    setLoading(true)
    const response = await getServiceCPTCodes(value)
    if (response.state === 'success') {
      setResults(response.data.serviceCPTData || [])
    } else {
      setResults([])
      toast('Error fetching procedure data')
    }
    setLoading(false)
  }, 500)

  const renderColumn = (value: string, disabled?: boolean) => {
    const content = value ? (
      <Text>{value}</Text>
    ) : (
      <Text size="1" className={cn('text-gray-9', { 'text-gray-8': disabled })}>
        {placeholder}
      </Text>
    )

    return (
      <Box
        className={cn(
          'width-full flex w-full cursor-pointer items-center justify-between',
        )}
        onClick={() => setOpen(true)}
      >
        <Flex
          py="2"
          px="2"
          align="center"
          className={cn('h-6 rounded-item [box-shadow:none]')}
        >
          {content}
        </Flex>
        <Flex>
          <MagnifyingGlassIcon className="ml-2" height="16" width="16" />
        </Flex>
      </Box>
    )
  }

  const renderItem = (item: CodeItem) => {
    return (
      <Box
        py="1"
        px="2"
        className="hover:bg-pp-black-1 hover:text-white mx-1 rounded-1"
        onClick={() => {
          if (onChange) onChange(item)
          setOpen(false)
        }}
      >
        <Text size="1" weight="regular">
          {item.code}
        </Text>
      </Box>
    )
  }

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger disabled={disabled}>
            {renderColumn(field.value, disabled)}
          </Popover.Trigger>
          <Popover.Content className="p-0">
            <Flex className="py-1">
              <TextField.Root
                size="1"
                variant="soft"
                onChange={(e) => handleSearchService(e.target.value)}
                placeholder={placeholder}
                autoFocus
                className="bg-white h-6 flex-1 border-0 outline-none [&>*]:bg-transparent [&>*]:outline-none"
                required={required}
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
            {results.length === 0 && !loading && (
              <Flex py="4" justify="center">
                <Text size="2" color="gray" align="center">
                  No results
                </Text>
              </Flex>
            )}

            <Separator color="gray" size="4" />
            <Flex direction="column" py="1" gap="1">
              <ScrollArea scrollbars="vertical" className="max-h-[100px]">
                {results.map((item) => (
                  <Box key={item.code} className="cursor-pointer">
                    {renderItem(item)}
                  </Box>
                ))}
              </ScrollArea>
            </Flex>
          </Popover.Content>
        </Popover.Root>
      )}
    />
  )
}

export { SearchProcedureCodes }
