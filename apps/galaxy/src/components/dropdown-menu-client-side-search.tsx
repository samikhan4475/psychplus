'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { useFormContext } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import { SelectOptionType } from '@/types'
import { cn } from '@/utils'

interface DropdownMenuSearchProps {
  initialValue?: string
  placeholder?: string
  disabled?: boolean
  field: string
  options: SelectOptionType[]
  onChange?: (value: SelectOptionType) => void
  className?: string
}

const DropdownMenuClientSideSearch = ({
  initialValue,
  placeholder = 'Search',
  disabled,
  onChange,
  options,
  field,
  className,
}: DropdownMenuSearchProps) => {
  const form = useFormContext()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [value, setValue] = useState<string | undefined>(initialValue)
  const [highlightedIdx, setHighlightedIdx] = useState(0)
  const [debouncedSearch] = useDebounce(search, 200)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isKeyboardNav, setIsKeyboardNav] = useState(false)

  useEffect(() => {
    if (open) {
      setSearch('')
      setHighlightedIdx(0)
    }
  }, [open])

  const filteredResults = useMemo(() => {
    if (!debouncedSearch) return options
    return options.filter((option) =>
      option.label.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
  }, [debouncedSearch, options])

  const getTitle = useCallback(
    (val: string) => options.find((opt) => opt.value === val)?.label,
    [options],
  )

  const handleSelect = (option: SelectOptionType) => {
    setValue(option.value)
    onChange?.(option)
    form.setValue(field, option.value)
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!filteredResults.length) return
    setIsKeyboardNav(true)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIdx((prev) =>
        prev + 1 < filteredResults.length ? prev + 1 : 0,
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIdx((prev) =>
        prev - 1 >= 0 ? prev - 1 : filteredResults.length - 1,
      )
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = filteredResults[highlightedIdx]
      if (selected) handleSelect(selected)
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    const el = container?.querySelector(`[data-idx="${highlightedIdx}"]`)
    if (el && el instanceof HTMLElement) {
      el.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIdx])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger disabled={disabled}>
        <Box className="ml-6 flex h-6 w-[500px] cursor-pointer items-center gap-1 rounded-1 border border-gray-7 p-[5px] !text-1">
          <MagnifyingGlassIcon height="16" width="16" />
          <Text className="truncate">
            {value ? getTitle(value) : placeholder}
          </Text>
        </Box>
      </Popover.Trigger>

      <Popover.Content className="w-[500px] p-0">
        <TextField.Root
          size="2"
          variant="soft"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          placeholder={placeholder}
          className="border-0 bg-transparent outline-none"
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        {filteredResults.length ? <Separator color="gray" size="4" /> : null}

        {filteredResults.length === 0 ? (
          <Flex py="4" justify="center">
            <Text size="2" color="gray" align="center">
              No results
            </Text>
          </Flex>
        ) : (
          <Flex direction="column" py="1" gap="1" className="w-full">
            <ScrollArea
              scrollbars="vertical"
              className={cn(
                className,
                'max-h-[250px] w-full overflow-y-auto p-2',
              )}
            >
              <div ref={scrollRef}>
                {filteredResults.map((item, idx) => {
                  const isHighlighted = isKeyboardNav && idx === highlightedIdx

                  return (
                    <Box
                      key={item.value || idx}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => {
                        setHighlightedIdx(idx)
                        setIsKeyboardNav(false)
                      }}
                      data-idx={idx}
                      className={cn(
                        'hover:bg-pp-black-1 hover:text-white block w-full cursor-pointer p-2 py-1 text-1',
                        isHighlighted && 'bg-pp-black-1 text-white !text-1',
                      )}
                    >
                      {item.label}
                    </Box>
                  )
                })}
              </div>
            </ScrollArea>
          </Flex>
        )}
      </Popover.Content>
    </Popover.Root>
  )
}

export { DropdownMenuClientSideSearch }
