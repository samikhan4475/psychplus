import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Flex,
  ScrollArea,
  Text,
  TextField,
} from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { IcdCodes } from '@psychplus/assessment-and-treatment-plan/types'
import { getIcdCodes } from '@psychplus/functional-cognitive/api.client'
import { SchemaType } from '.'

interface Provider {
  id: number
  code: string
  description: string
}

const fetchIcdCodes = async (input: string) => {
  return getIcdCodes({ codeOrDescription: input })
}

const renderItem = (provider: Provider) => {
  return (
    <Flex className="rounded-[8px] border-b border-gray-2 px-4 py-2">
      <Text className="flex-1">{provider.code}</Text>
      <Text className="flex-1 pl-3" weight="light">
        {provider.description}
      </Text>
    </Flex>
  )
}

interface DropdownMenuSearchProps<T> {
  initialValue?: T
  placeholder?: string
  onChange?: (value: IcdCodes) => void
  form: UseFormReturn<SchemaType>
}

const TreatmentPlanSearchDropdown = <T extends IcdCodes>({
  initialValue,
  placeholder = 'Search',
  onChange,
  form,
}: DropdownMenuSearchProps<T>) => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [results, setResults] = useState<IcdCodes[] | undefined>()
  const [value, setValue] = useState<IcdCodes | undefined>(initialValue)

  useEffect(() => {
    setOpen(!!results?.length)
  }, [results])

  const handleSearch = async () => {
    if (!input) {
      setOpen(false)
      return
    }

    const res = await fetchIcdCodes(input)

    setResults(res)
  }

  const clearFilters = () => {
    setInput('')
    setResults(undefined)
    setValue(undefined)
    setOpen(false)
    form.resetField('symptomCode')
    form.resetField('symptomCodeDescription')
  }

  useEffect(() => {
    if (value) {
      setInput('')
      form.setValue('symptomCode', value.code)
      form.setValue('symptomCodeDescription', value.description)
    }
  }, [value])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
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
          className="border-0 outline-none [&>*]:bg-transparent [&>*]:outline-none"
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
                    Code
                  </Text>
                  <Text className="font-semibold flex-1 pl-3" weight="medium">
                    Description
                  </Text>
                </Flex>
                <ScrollArea scrollbars="vertical" style={{ maxHeight: 250 }}>
                  {results.map((item, idx) => (
                    <Box
                      key={item.id ?? idx}
                      onClick={() => {
                        setValue(item)
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
  )
}

export { TreatmentPlanSearchDropdown }
