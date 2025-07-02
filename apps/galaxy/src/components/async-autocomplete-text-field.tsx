'use client'

import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Box,
  Flex,
  Popover,
  ScrollArea,
  Separator,
  Text,
  TextField,
  Tooltip,
} from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { type ActionResult } from '@/api'
import { SelectOptionType } from '@/types'
import { cn, truncateString } from '@/utils'
import { LoadingPlaceholder } from './loading-placeholder'

interface AsyncAutoCompleteTextFieldProps {
  placeholder?: string
  disabled?: boolean
  field: string
  valueKey?: string
  className?: string
  truncateText?: number
  fetchDataAction: (search: string) => Promise<ActionResult<SelectOptionType[]>>
  onSelect?: (option: SelectOptionType) => void
}

const AsyncAutoCompleteTextField = ({
  field,
  fetchDataAction,
  className,
  placeholder,
  truncateText,
  disabled = false,
  valueKey = 'value',
  onSelect,
  children,
}: PropsWithChildren<AsyncAutoCompleteTextFieldProps>) => {
  const form = useFormContext()
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState(form.getValues(field))
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const listRef = useRef<HTMLDivElement>(null)

  const handleSearchService = useDebouncedCallback(async (value: string) => {
    if (value.length < 2) return
    setLoading(true)
    setResults([])
    const response = await fetchDataAction(value)
    if (response.state === 'success') {
      setResults(response.data || [])
    } else {
      toast.error('Failed to fetch data. Please try again.')
      setResults([])
    }
    setLoading(false)
    setFocusedIndex(-1)
  }, 300)

  const onOpenChange = (open: boolean) => {
    if (!disabled) {
      setOpen(open)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!open) return

    switch (event.key) {
      case 'ArrowDown':
        setFocusedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        event.preventDefault()
        break

      case 'ArrowUp':
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        event.preventDefault()
        break

      case 'Enter':
        if (focusedIndex !== -1) {
          handleSelect(results[focusedIndex])
        }
        event.preventDefault()
        break

      case 'Escape':
        setOpen(false)
        event.preventDefault()
        break

      default:
        break
    }
  }
  const label = valueKey === 'insurancePlanObject' ? selectedLabel?.name : selectedLabel
  
  useEffect(() => {
    if (!listRef.current || focusedIndex === -1) return
    const focusedItem = listRef.current.children[focusedIndex] as HTMLElement
    focusedItem?.scrollIntoView({ block: 'nearest' })
  }, [focusedIndex])

  const renderTrigger = () =>
    children ? (
      <Box onClick={() => !disabled && onOpenChange(true)}>{children}</Box>
    ) : (
      <Box
        onClick={() => onOpenChange(true)}
        className={cn(
          'flex h-7 w-full cursor-pointer items-center justify-between rounded-1 border border-gray-7',
          { 'bg-pp-states-disabled cursor-not-allowed': disabled },
          className,
        )}
      >
        {form.watch(field) ? (
          <Tooltip content={<Text className="select-text">{label}</Text>}>
            <Text className="text-gray-200 px-2 text-1">
              {truncateText ? truncateString(label, truncateText) : label}
            </Text>
          </Tooltip>
        ) : (
          <Text className="px-2 text-1 text-gray-9">{placeholder}</Text>
        )}

        <MagnifyingGlassIcon className="mr-2" height="16" width="16" />
      </Box>
    )
  const renderItem = (item: SelectOptionType, index: number) => (
    <Box
      key={item.value}
      className={cn(
        'rounded cursor-pointer px-2 py-1',
        focusedIndex === index
          ? 'bg-pp-black-1 text-white'
          : 'hover:bg-pp-black-1 hover:text-white',
      )}
      onClick={() => handleSelect(item)}
    >
      <Text size="2">{item.label}</Text>
    </Box>
  )
  const handleSelect = (item: SelectOptionType) => {
    onSelect?.(item)

    let value
    if (valueKey === 'insurancePlanObject') {
      value = item.insurancePlanObject
    } else if (valueKey === 'value') {
      value = item.value
    } else {
      value = item.label
    }
    form.setValue(field, value)
    valueKey === 'insurancePlanObject'
      ? setSelectedLabel(item.insurancePlanObject)
      : setSelectedLabel(item.label)
    setOpen(false)
  }
  return (
    <Controller
      name={field}
      control={form.control}
      render={() => (
        <Popover.Root open={open} onOpenChange={onOpenChange}>
          <Popover.Trigger disabled={disabled}>
            {renderTrigger()}
          </Popover.Trigger>
          <Popover.Content
            className="shadow-lg rounded-lg bg-white w-full max-w-xs border-0 p-0"
            onKeyDown={handleKeyDown}
          >
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
              <LoadingPlaceholder className="bg-white min-h-[10vh]" />
            )}
            {results.length > 0 && (
              <ScrollArea className="max-h-[250px]">
                <Box ref={listRef}>{results.map(renderItem)}</Box>
              </ScrollArea>
            )}
          </Popover.Content>
        </Popover.Root>
      )}
    />
  )
}

export { AsyncAutoCompleteTextField }
