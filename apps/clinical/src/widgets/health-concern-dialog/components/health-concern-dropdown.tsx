import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { IcdCodes } from '@psychplus/health-concerns'

interface DropdownMenuSearchProps {
  placeholder?: string
  onChange: (value: IcdCodes) => void
  fetchResults: (input: string) => Promise<IcdCodes[]>
  clearFilters: () => void
}

const HealthConcernSearchDropdown = ({
  placeholder = 'Search',
  onChange,
  fetchResults,
  clearFilters,
}: DropdownMenuSearchProps) => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [results, setResults] = useState<IcdCodes[]>([])

  useEffect(() => {
    setOpen(results.length > 0)
  }, [results])

  const handleSearch = async () => {
    if (!input) return

    const res = await fetchResults(input)

    setResults(res)
  }

  const handleItemClick = (item: IcdCodes) => {
    setOpen(false)
    onChange(item)
  }

  const handleClear = () => {
    setInput('')
    setResults([])
    setOpen(false)
    clearFilters()
  }

  return (
    <Flex align="center" gap="2">
      <Box className="z-50 h-8 flex-1">
        <TextField.Root className="h-8 rounded-b-2 rounded-tr-2 border border-gray-7 [&>*]:bg-transparent [&>*]:outline-none">
          <TextField.Input
            size="3"
            variant="soft"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="h-8 border-0 outline-none"
          />
        </TextField.Root>
        {results.length > 0 && open && (
          <Box className="rounded-2 border border-gray-7 bg-[white] p-2">
            <Flex className="border border-[#C8D6FF] bg-[#EBF3FC]">
              <Box className="flex-1 border-r border-[#C8D6FF] p-2">
                <Text weight="medium">Code</Text>
              </Box>
              <Box className="flex-1 p-2">
                <Text weight="medium">Description</Text>
              </Box>
            </Flex>
            <Box className="max-h-32 overflow-y-scroll">
              {results.map((item) => (
                <Flex
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="p-2 transition-colors duration-200 hover:rounded-2 hover:bg-gray-3"
                >
                  <Box className="flex-1">
                    <Text>{item.code}</Text>
                  </Box>
                  <Box className="flex-1 pl-3">
                    <Text>{item.description}</Text>
                  </Box>
                </Flex>
              ))}
            </Box>
          </Box>
        )}
      </Box>
      <Box>
        <Button className="mr-n5 h-8 bg-[#151B4A]" onClick={handleSearch}>
          <MagnifyingGlassIcon />
        </Button>
        <Button
          variant="outline"
          highContrast
          className="ml-2 h-8 bg-[#EAEEF9]"
          onClick={handleClear}
        >
          Clear
        </Button>
      </Box>
    </Flex>
  )
}

export { HealthConcernSearchDropdown }
