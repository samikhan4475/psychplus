import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as Toast from '@radix-ui/react-toast'
import {
  Box,
  Button,
  Flex,
  ScrollArea,
  Text,
  TextField,
} from '@radix-ui/themes'
import { CvxCodes } from '@psychplus/immunization'
import { getCvxCodes } from '@psychplus/immunization/api.client'
import { useToast } from '@psychplus/ui/toast-provider'

interface Provider {
  id: string
  cvxCode: string
  mvxCode: string
  ndcCode: string
}

const fetchResults = async (input: string) => {
  return getCvxCodes(input)
}

const renderItem = (provider: Provider) => {
  return (
    <Flex className="rounded-[8px] border-b border-gray-2 px-4 py-2">
      <Text className="flex-1">{provider.cvxCode}</Text>
      <Text className="flex-1 pl-3" weight="light">
        {provider.mvxCode}
      </Text>
      <Text className="flex-1 pl-3" weight="light">
        {provider.ndcCode}
      </Text>
    </Flex>
  )
}

interface DropdownMenuSearchProps {
  placeholder?: string
  onChange?: (value: CvxCodes) => void
  setFormValue: (value?: CvxCodes) => void
  clearFormValue: () => void
}

const ImmunizationSearchDropdown = ({
  placeholder = 'Search',
  onChange,
  setFormValue,
  clearFormValue,
}: DropdownMenuSearchProps) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [results, setResults] = useState<CvxCodes[] | undefined>()

  useEffect(() => {
    setOpen(!!results?.length)
  }, [results])

  const handleSearch = async () => {
    if (!input) {
      setOpen(false)
      return
    }

    fetchResults(input)
      .then((results) => {
        setResults(results)
      })
      .catch((err) => {
        if (err instanceof Error) {
          toast({ type: 'error', title: err.message })
        } else {
          console.error('An unknown error occurred:', err)
        }
      })
  }

  const clearFilters = () => {
    setInput('')
    setResults(undefined)

    setOpen(false)
    clearFormValue()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Toast.Provider>
      <Flex align="center" gap="2">
        <Box className="z-50 h-8 flex-1 border border-gray-7">
          <TextField.Root
            size="3"
            variant="soft"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            onKeyDown={handleKeyPress}
            autoFocus
            className="h-8 border-0 outline-none [&>*]:bg-transparent [&>*]:outline-none"
          />
          <Box>
            {results?.length === 0 && open && (
              <Flex py="4" justify="center">
                <Text size="2" color="gray" align="center">
                  No results
                </Text>
              </Flex>
            )}
            {results?.length && open && (
              <Flex direction="column" py="1" gap="1">
                <Box className="overflow-hidden rounded-[8px] border border-[lightgray] bg-[white] p-2">
                  <Flex className="mb-3 border-[1px] border-[#C8D6FF] bg-[#EBF3FC] px-4 py-2">
                    <Text
                      className="font-semibold flex-1 border-r-[1px] border-[#C8D6FF]"
                      weight="medium"
                    >
                      cvxCode
                    </Text>
                    <Text className="font-semibold flex-1 pl-3" weight="medium">
                      mvxCode
                    </Text>
                    <Text className="font-semibold flex-1 pl-3" weight="medium">
                      ndcCode
                    </Text>
                  </Flex>
                  <ScrollArea scrollbars="vertical" style={{ maxHeight: 250 }}>
                    {results.map((item, idx) => (
                      <Box
                        key={item.id ?? idx}
                        onClick={() => {
                          setFormValue(item)
                          setOpen(false)
                          onChange?.(item)
                        }}
                        className="cursor-pointer bg-[#FFFFFF] transition-colors duration-200 hover:bg-[#F2F2F5]"
                      >
                        {renderItem(item)}
                      </Box>
                    ))}
                  </ScrollArea>
                </Box>
              </Flex>
            )}
          </Box>
        </Box>
        <Box>
          <Button className="mr-n5 h-8 bg-[#151B4A]" onClick={handleSearch}>
            <MagnifyingGlassIcon />
          </Button>
          <Button
            variant="outline"
            highContrast
            className="ml-2 h-8 bg-[#EAEEF9]"
            onClick={clearFilters}
          >
            Clear
          </Button>
        </Box>
      </Flex>
    </Toast.Provider>
  )
}

export { ImmunizationSearchDropdown }
