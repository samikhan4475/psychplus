'use client'

import { useEffect, useState } from 'react'
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
import toast from 'react-hot-toast'
import { useDebounce } from 'use-debounce'
import { ActionResult } from '@/api'

interface MaybeID {
  id?: string | number
}

interface DropdownMenuSearchProps<T> {
  initialValue?: T
  placeholder?: string
  disabled?: boolean
  initialFetchAll?: boolean
  defaultData?: T[]
  fetchResults: (input: string) => Promise<ActionResult<T[]>>
  renderItem: (value: T) => React.ReactNode
  renderTrigger: (value?: T, disabled?: boolean) => React.ReactNode
  onChange?: (value: T) => void
}

const DropdownMenuSearch = <T extends MaybeID>({
  initialValue,
  placeholder = 'Search',
  disabled,
  fetchResults,
  renderItem,
  renderTrigger,
  onChange,
  defaultData,
  initialFetchAll,
}: DropdownMenuSearchProps<T>) => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounce(input, 500)
  const [results, setResults] = useState<T[] | undefined>(defaultData || [])
  const [value, setValue] = useState<T | undefined>(initialValue)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    if (debouncedInput || initialFetchAll) {
      setLoading(true)
      fetchResults(debouncedInput).then((res) => {
        if (res.state === 'error') {
          return toast.error(res.error)
        }
        setResults(res.data)
        setLoading(false)
      })
    }

    return () => {
      controller.abort()
    }
  }, [debouncedInput, fetchResults])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger disabled={disabled}>
        {renderTrigger(value, disabled)}
      </Popover.Trigger>
      <Popover.Content className="p-0">
        <TextField.Root
          size="2"
          variant="soft"
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          autoFocus
          className="border-0 bg-transparent outline-none"
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        {results ? <Separator color="gray" size="4" /> : null}
        {loading && (
          <Flex py="4" justify="center">
            <Text size="2" color="gray" align="center">
              Loading...
            </Text>
          </Flex>
        )}
        {!loading && results?.length === 0 && (
          <Flex py="4" justify="center">
            <Text size="2" color="gray" align="center">
              No results
            </Text>
          </Flex>
        )}
        {!loading && results?.length ? (
          <Flex direction="column" py="1" gap="1">
            <ScrollArea scrollbars="vertical" style={{ maxHeight: 250 }}>
              {results.map((item, idx) => (
                <Box
                  key={item.id ? item.id : idx}
                  onClick={() => {
                    setValue(item)
                    setOpen(false)
                    onChange?.(item)
                  }}
                  className="cursor-pointer"
                >
                  {renderItem(item)}
                </Box>
              ))}
            </ScrollArea>
          </Flex>
        ) : null}
      </Popover.Content>
    </Popover.Root>
  )
}

export { DropdownMenuSearch }
