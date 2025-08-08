'use client'

import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Box,
  Flex,
  Popover,
  ScrollArea,
  Text,
  TextField,
} from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { LoadingPlaceholder } from '@/components'
import { ActionResult } from '@/types'

interface SearchItem {
  label: string
  value: string
  code?: string
  description?: string
}

interface SearchPopoverInputProps {
  placeholder?: string
  disabled?: boolean
  triggerElement?: React.ReactNode
  onSelectItem: (item: SearchItem) => void
  api: (query: string) => Promise<ActionResult<SearchItem[]>>
  isItemDisabled?: (item: SearchItem) => boolean
  popoverWidth?: number
  renderItem?: (
    item: SearchItem,
    onSelect: () => void,
    isDisabled: boolean,
  ) => React.ReactNode
}

function SearchPopoverInput({
  placeholder = 'Search...',
  disabled = false,
  triggerElement,
  onSelectItem,
  api,
  isItemDisabled = () => false,
  popoverWidth = 250,
  renderItem,
}: Readonly<SearchPopoverInputProps>) {
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<SearchItem[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = useDebouncedCallback(async (value: string) => {
    if (value.length < 2) return
    setLoading(true)
    setResults([])
    const result = await api(value)
    if (result.state === 'error')
      return toast.error(result.error ?? 'Failed to fetch options')
    setResults(result.data)
    setLoading(false)
  }, 500)

  const defaultRenderItem = (
    item: SearchItem,
    onSelect: () => void,
    isDisabled: boolean,
  ) => (
    <Box
      key={item.value}
      py="1"
      px="2"
      className={`hover:bg-pp-black-1 hover:text-white mx-1 rounded-1 ${
        isDisabled
          ? 'bg-pp-states-disabled cursor-not-allowed opacity-50'
          : 'cursor-pointer'
      }`}
      onClick={onSelect}
    >
      <Text size="1">
        {item.code ?? item.value} {item.description ?? item.label}
      </Text>
    </Box>
  )

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger disabled={disabled}>
        {triggerElement ?? (
          <Box className="rounded cursor-pointer border p-2">
            <MagnifyingGlassIcon />
          </Box>
        )}
      </Popover.Trigger>

      <Popover.Content className="z-50 p-0" style={{ width: popoverWidth }}>
        <Box p="2">
          <TextField.Root
            size="1"
            variant="soft"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={placeholder}
            autoFocus
            className="bg-white w-full"
            disabled={disabled}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>

        {loading && (
          <Flex py="2" justify="center">
            <Text size="1" color="gray">
              <LoadingPlaceholder className="min-h-[50px]" />
            </Text>
          </Flex>
        )}

        {!loading && results.length === 0 && (
          <Flex py="2" justify="center">
            <Text size="1" color="gray">
              No results
            </Text>
          </Flex>
        )}

        <ScrollArea scrollbars="vertical" className="max-h-[150px] px-1 pb-2">
          {results?.map((item) =>
            (renderItem ?? defaultRenderItem)(
              item,
              () => {
                if (!isItemDisabled(item)) {
                  onSelectItem(item)
                  setOpen(false)
                }
              },
              isItemDisabled(item),
            ),
          )}
        </ScrollArea>
      </Popover.Content>
    </Popover.Root>
  )
}

export { SearchPopoverInput, type SearchItem }
