'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { cn } from '@/utils'
import { getServiceModifiersCodes } from '../actions'

interface CodeItem {
  code: string
  displayName: string
}

interface SearchModifierCodesProps {
  initialValue?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (value: CodeItem) => void
  required?: boolean
  fieldName: string
}

const SearchModifierCodes = ({
  initialValue,
  placeholder = 'Search',
  disabled = false,
  onChange,
  required = false,
  fieldName,
}: SearchModifierCodesProps) => {
  const { control } = useFormContext()
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<CodeItem[]>([])
  const [loading, setLoading] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!disabled) setOpen(isOpen)
    },
    [disabled],
  )

  const handleSelectItem = useCallback(
    (item: CodeItem) => {
      onChange?.(item)
      inputRef.current?.focus()
      setOpen(false)
    },
    [onChange],
  )

  const handleSearch = useDebouncedCallback(async (value: string) => {
    setLoading(true)
    const response = await getServiceModifiersCodes(value)
    if (response.state === 'success') {
      setResults(response.data.serviceModifierData || [])
    } else {
      setResults([])
      toast.error('Error fetching modifier codes')
    }
    setLoading(false)
    setFocusedIndex(-1)
  }, 500)

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return

    switch (e.key) {
      case 'ArrowDown':
        setFocusedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        e.preventDefault()
        break
      case 'ArrowUp':
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        e.preventDefault()
        break
      case 'Enter':
        if (focusedIndex >= 0) {
          handleSelectItem(results[focusedIndex])
        }
        e.preventDefault()
        break
      case 'Escape':
        setOpen(false)
        e.preventDefault()
        break
      case 'Tab':
        inputRef.current?.focus()
        break
    }
  }

  useEffect(() => {
    if (!listRef.current || focusedIndex === -1) return
    const item = listRef.current.children[focusedIndex] as HTMLElement
    item?.scrollIntoView({ block: 'nearest' })
  }, [focusedIndex])

  const renderTriggerContent = (value: string | undefined) => (
    <Box
      className={cn('flex cursor-pointer items-center', {
        'bg-pp-states-disabled cursor-not-allowed': disabled,
      })}
      onClick={() => handleOpenChange(true)}
    >
      <Flex
        py="2"
        px="2"
        align="center"
        className="h-6 rounded-item [box-shadow:none]"
      >
        <Text
          size="1"
          className={cn({ 'text-black': value, 'text-gray-8': !value })}
        >
          {value || placeholder}
        </Text>
      </Flex>
      <MagnifyingGlassIcon className="ml-2" height="16" width="16" />
    </Box>
  )

  const renderResultItem = (item: CodeItem, index: number) => (
    <Box
      key={item.code}
      py="1"
      px="2"
      className={cn('mx-1 cursor-pointer rounded-1', {
        'bg-pp-states-disabled cursor-not-allowed': disabled,
        'bg-pp-black-1 text-white': focusedIndex === index,
        'hover:bg-pp-black-1 hover:text-white': focusedIndex !== index,
      })}
      onClick={() => handleSelectItem(item)}
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
              {renderTriggerContent(field.value || initialValue)}
            </Popover.Trigger>
            <Popover.Content className="p-0" onKeyDown={handleInputKeyDown}>
              <Flex className="py-1">
                <TextField.Root
                  size="1"
                  variant="soft"
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={placeholder}
                  autoFocus
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
                  <Text size="2" color="gray">
                    Loading...
                  </Text>
                </Flex>
              )}
              {!loading && results.length === 0 && (
                <Flex py="4" justify="center">
                  <Text size="2" color="gray">
                    No results
                  </Text>
                </Flex>
              )}

              <Separator color="gray" size="4" />

              <Flex direction="column" py="1" gap="1">
                <ScrollArea scrollbars="vertical" className="max-h-[100px]">
                  <Box ref={listRef}>
                    {results.map((item, index) =>
                      renderResultItem(item, index),
                    )}
                  </Box>
                </ScrollArea>
              </Flex>
            </Popover.Content>
          </Popover.Root>
        )}
      />
    </>
  )
}

export { SearchModifierCodes }
