'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Popover, Separator, Text } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDebounce } from 'use-debounce'
import { ActionResult } from '@/api'
import { LoadingPlaceholder } from '@/components'
import { cn } from '@/utils'
import { ServerSearchSelectID } from '../../../types'
import SearchInput from './search-input'
import { SearchResults } from './search-results'

interface ServerSearchSelectProps<T> {
  initialValue?: T
  placeholder?: string
  disabled?: boolean
  fetchResults: (input: string) => Promise<ActionResult<T[]>>
  formatText: (value: T) => string
  onChange?: (value: T) => void
  required?: boolean
  fieldName: string
}

const ServerSearchSelect  = <T extends ServerSearchSelectID>({
  initialValue,
  placeholder = 'Search',
  disabled = false,
  fetchResults,
  formatText,
  onChange,
  required = false,
  fieldName,
}: ServerSearchSelectProps<T>) => {
  const { control } = useFormContext()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounce(input, 500)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [results, setResults] = useState<T[] | undefined>()

  useEffect(() => {
    if (debouncedInput) {
      setIsLoading(true)
      fetchResults(debouncedInput).then((res) => {
        setIsLoading(false)
        if (res.state === 'success') {
          setResults(res.data)
        } else {
          toast.error(res.error || 'Failed to fetch options')
        }
      })
    }
  }, [debouncedInput])

  const renderTrigger = (item?: T, disabled?: boolean) => {
    let content = null

    if (item) {
      content = renderValue(item)
    } else {
      content = (
        <Text
          size="1"
          className={cn('text-gray-9', { 'text-gray-8': disabled })}
        >
          Search
        </Text>
      )
    }

    return (
      <Box
        className={cn(
          'width-full h-6 flex-1 cursor-pointer enabled:hover:bg-accent-2 ',
          {
            'cursor-not-allowed': disabled,
            'bg-gray-2': disabled,
          },
        )}
        onClick={(e) => {
          if (disabled) return e.preventDefault()
          setOpen(true)
        }}
      >
        <Flex
          py="2"
          px="2"
          align="center"
          className={cn('h-6 rounded-item border border-gray-7', {
            'border-gray-5': disabled,
          })}
        >
          {content}
        </Flex>
      </Box>
    )
  }

  const renderItem = (item: T) => {
    return (
      <Box
        py="1"
        px="2"
        className="hover:bg-pp-black-1 hover:text-white mx-1 rounded-1"
      >
        {renderValue(item)}
      </Box>
    )
  }

  const renderValue = (item: T) => {
    return (
      <Text
        size="1"
        weight="regular"
        className={cn({ 'text-gray-8': disabled })}
      >
        {formatText(item)}
      </Text>
    )
  }

  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={initialValue}
      render={({ field }) => (
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger disabled={disabled}>
            {renderTrigger(field.value, disabled)}
          </Popover.Trigger>
          <Popover.Content className="p-0">
            <SearchInput
              setInput={setInput}
              placeholder={placeholder}
              required={required}
            />

            {isLoading && (
              <LoadingPlaceholder className="bg-white min-h-[46vh]" />
            )}

            {results?.length ? <Separator color="gray" size="4" /> : null}

            {results?.length === 0 && !isLoading ? (
              <Flex py="4" justify="center">
                <Text size="2" color="gray" align="center">
                  No results
                </Text>
              </Flex>
            ) : null}

            {!isLoading && (
              <SearchResults
                results={results}
                renderItem={renderItem}
                onItemSelect={(item) => {
                  field.onChange(item)
                  setOpen(false)
                  onChange?.(item)
                }}
              />
            )}
          </Popover.Content>
        </Popover.Root>
      )}
    />
  )
}

export { ServerSearchSelect }
