import React, { useEffect, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { createPortal } from 'react-dom'
import { TextField } from '@psychplus/ui/text-field'
import useDebounce from './useDebounce'

interface DropdownMenuSearchProps<T> {
  placeholder?: string
  onSelectItem: (selectedItem: T) => void
  searchQuery?: string
  fetchResults: (query: string) => Promise<T[]>
  renderItem: (item: T) => React.ReactNode
}

const SearchDropdown = <T,>({
  placeholder,
  onSelectItem,
  searchQuery,
  fetchResults,
  renderItem,
}: DropdownMenuSearchProps<T>) => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState(searchQuery ?? '')
  const [results, setResults] = useState<T[]>([])
  const [hasTyped, setHasTyped] = useState(false)
  const debouncedInput = useDebounce(input, 500)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    if (searchQuery) {
      setInput(searchQuery)
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setOpen(false)
        setResults([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setOpen(!!results.length)
  }, [results])

  useEffect(() => {
    if (hasTyped && debouncedInput.length >= 2) {
      handleSearch()
    }
  }, [debouncedInput, hasTyped])

  useEffect(() => {
    if (open && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setDropdownStyle({
        position: 'absolute',
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        zIndex: 9999,
      })
    }
  }, [open])

  const handleSearch = async () => {
    if (!input) {
      setOpen(false)
      return
    }
    const res = await fetchResults(input)
    if (res === undefined || res === null) {
      setResults([])
    } else {
      setResults(res)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setHasTyped(true)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSelectItem = (item: T) => {
    setInput('')
    setOpen(false)
    onSelectItem(item)
    setHasTyped(false)
  }

  const dropdown = (
    <Box ref={dropdownRef} style={dropdownStyle}>
      <Flex direction="column" py="1" gap="1">
        <Box className="overflow-hidden rounded-[8px] border border-[lightgray] bg-[white] p-2">
          <ScrollArea scrollbars="vertical" style={{ maxHeight: 250 }}>
            {results.length === 0 ? (
              <Flex py="4" justify="center">
                <Text size="2" color="gray" align="center">
                  No results
                </Text>
              </Flex>
            ) : (
              results.map((item: any, idx) => (
                <Box
                  key={item.code}
                  onClick={() => handleSelectItem(item)}
                  className="cursor-pointer bg-[#FFFFFF] transition-colors duration-200 hover:bg-[#F2F2F5]"
                >
                  {renderItem(item)}
                </Box>
              ))
            )}
          </ScrollArea>
        </Box>
      </Flex>
    </Box>
  )

  return (
    <Flex align="center" gap="2" className="relative">
      <Box ref={inputRef} className="relative flex flex-row-reverse">
        <TextField.Slot onClick={handleSearch}>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Root
          size="1"
          placeholder={placeholder}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </Box>

      {open && createPortal(dropdown, document.body)}
    </Flex>
  )
}

export default SearchDropdown
