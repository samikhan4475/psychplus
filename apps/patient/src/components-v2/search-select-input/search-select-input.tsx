'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Popover, Separator, Text } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import { useToast } from '@/providers'
import { LoadingPlaceholder } from '../loading-placeholder'
import { SearchInput } from './search-input'
import { SearchResults } from './search-results'
import { ServerSearchSelectID } from './types'

interface SearchSelectInputProps<T> {
  initialValue?: T
  triggerPlaceholder?: string
  placeholder?: string
  disabled?: boolean
  fetchResults: (
    input: string,
  ) => Promise<{ state: string; data?: T[]; error?: string }>
  formatText: (value: T) => string
  onChange?: (value: T) => void
  required?: boolean
  fieldName: string
  className?: string
}

const SearchSelectInput = <T extends ServerSearchSelectID>({
  initialValue,
  triggerPlaceholder = 'Search',
  placeholder = 'Search',
  disabled = false,
  fetchResults,
  formatText,
  onChange,
  required = false,
  fieldName,
  className,
}: SearchSelectInputProps<T>) => {
  const { control } = useFormContext()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounce(input, 500)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<T[] | undefined>()

  useEffect(() => {
    if (!debouncedInput) return

    setIsLoading(true)
    fetchResults(debouncedInput)
      .then((res) => {
        if (res.state === 'success') {
          setResults(res.data || [])
        } else {
          toast({
            type: 'error',
            title: res.error || 'Failed to fetch options',
          })
        }
      })
      .finally(() => setIsLoading(false))
  }, [debouncedInput, fetchResults, toast])

  const handleItemSelect = (item: T, onFieldChange: (value: T) => void) => {
    onFieldChange(item)
    setOpen(false)
    onChange?.(item)
  }

  const renderTrigger = (value?: string) => (
    <Flex
      onClick={() => !disabled && setOpen(true)}
      className={`overflow-hidden whitespace-nowrap rounded-item border px-3 py-2 ${
        disabled ? 'bg-gray-3 text-gray-11' : 'cursor-pointer border-gray-7'
      }`}
    >
      <Text className={value ? 'text-black' : 'text-pp-gray-6'}>
        {value || triggerPlaceholder}
      </Text>
    </Flex>
  )

  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={initialValue}
      render={({ field }) => (
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger disabled={disabled}>
            {renderTrigger(field.value)}
          </Popover.Trigger>
          <Popover.Content className={`max-h-[250px] p-2 ${className}`}>
            <SearchInput
              setInput={setInput}
              placeholder={placeholder}
              required={required}
            />
            {!!results?.length && <Separator color="gray" size="4" />}
            {isLoading ? (
              <LoadingPlaceholder containerClassName="bg-white" />
            ) : (
              <SearchResults
                results={results || []}
                renderItem={(item) => (
                  <Box
                    py="1"
                    px="2"
                    className="hover:text-white hover:bg-pp-blue-7 rounded-1"
                  >
                    <Text size="1">{formatText(item)}</Text>
                  </Box>
                )}
                onItemSelect={(item) => handleItemSelect(item, field.onChange)}
              />
            )}
            {!isLoading && results?.length === 0 && (
              <Flex justify="center" py="4">
                <Text size="2" color="gray">
                  No results
                </Text>
              </Flex>
            )}
          </Popover.Content>
        </Popover.Root>
      )}
    />
  )
}

export { SearchSelectInput }
