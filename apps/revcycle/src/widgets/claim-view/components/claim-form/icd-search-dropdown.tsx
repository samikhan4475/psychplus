import React, { useEffect, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { FormTextInput } from '@psychplus/form'
import { getIcdCodes } from '../../api.client'
import { ICD10Code } from '../../types'

// Your fetchResults function
const fetchResults = async (input: string) => {
  const res = await getIcdCodes(input)
  return res
}

const renderItem = (provider: any) => {
  return (
    <Flex className="rounded-[8px] border-b border-gray-2 px-4 py-2">
      <Text className="flex-1">{provider.code}</Text>
    </Flex>
  )
}

interface DropdownMenuSearchProps<T> {
  placeholder?: string
  onSelectItem: (selectedItem: ICD10Code) => void
}

const IcdSearchDropdown = <T extends ICD10Code>({
  placeholder,
  onSelectItem,
}: DropdownMenuSearchProps<T>) => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [results, setResults] = useState<ICD10Code[]>()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
        setResults([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])
  useEffect(() => {
    setOpen(!!results?.length)
  }, [results])

  const handleSearch = async () => {
    if (!input) {
      setOpen(false)
      return
    }
    const res = await fetchResults(input)
    setResults(res)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSelectItem = (item: ICD10Code) => {
    setInput('')
    setOpen(false)
    onSelectItem(item) // Pass selected item to parent
  }

  return (
    <Flex align="center" gap="2" ref={dropdownRef}>
      <Box className="z-50 h-8 flex-1 ">
        <FormTextInput
          value={input}
          name=""
          type="text"
          label=""
          data-testid="add-fee-schedule-name-input"
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={handleKeyPress}
          autoFocus
          className="w-80 border-0 outline-none"
        />
        <Box>
          {open && (
            <>
              {results?.length === 0 || results === undefined ? (
                <Flex py="4" justify="center">
                  <Text size="2" color="gray" align="center">
                    No results
                  </Text>
                </Flex>
              ) : (
                <Flex direction="column" py="1" gap="1">
                  <Box className="overflow-hidden rounded-[8px] border border-[lightgray] bg-[white] p-2">
                    <ScrollArea
                      scrollbars="vertical"
                      style={{ maxHeight: 250 }}
                    >
                      {results?.map((item, idx) => (
                        <Box
                          key={item.code ?? idx}
                          onClick={() => handleSelectItem(item)}
                          className="cursor-pointer bg-[#FFFFFF] transition-colors duration-200 hover:bg-[#F2F2F5]"
                        >
                          {renderItem(item)}
                        </Box>
                      ))}
                    </ScrollArea>
                  </Box>
                </Flex>
              )}
            </>
          )}
        </Box>
      </Box>
      <Box>
        <Button
          className="mr-n5 h-[36px] bg-[#1b4594]"
          type="button"
          onClick={handleSearch}
        >
          <MagnifyingGlassIcon />
        </Button>
      </Box>
    </Flex>
  )
}

export { IcdSearchDropdown }
