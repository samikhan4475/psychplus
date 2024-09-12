import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import { Box, Button, TextField } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { DropdownProps } from '../types'

const Dropdown = ({
  initialValue,
  placeholder = 'Search',
  keyName = '',
  inputClass,
  liClass,
  className,
  disabled,
  fetchResults,
  onChange,
  defaultData = [],
}: DropdownProps) => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [results, setResults] = useState<any>(defaultData)
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    initialValue,
  )
  const [isFetching, setIsFetching] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const memoizedFetchResults = useCallback(
    fetchResults || (() => Promise.resolve([])),
    [],
  )

  useEffect(() => {
    if (initialValue) {
      setSelectedValue(initialValue)
    }
    if (defaultData.length > 0) {
      setResults(defaultData)
    }
  }, [initialValue, defaultData])

  useEffect(() => {
    if (!isFetching) return

    const debounceFetch = setTimeout(async () => {
      try {
        if (input) {
          const fetchedResults = await memoizedFetchResults(input)
          setResults(fetchedResults)
        } else {
          setResults(defaultData)
        }
      } catch (error) {
        console.error('Error fetching results:', error)
      } finally {
        setIsFetching(false)
      }
    }, 300)

    return () => clearTimeout(debounceFetch)
  }, [input, defaultData, isFetching, memoizedFetchResults])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const handleSelect = (item: any) => {
    setSelectedValue(item[keyName])
    setOpen(false)
    if (onChange) onChange(item)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setIsFetching(true)
  }
  return (
    <Box ref={dropdownRef} className="relative ">
      <Button
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'font-light',
          'text-1',
          'h-30',
          'text-left',
          'px-2',
          '!border',
          '!border-solid',
          '!border-[#cdced6]',
          'flex',
          'justify-between',
          'items-center',
          'rounded-md',
          'rounded-2',
          {
            'text-[#80838d]': !selectedValue,
            'cursor-not-allowed !bg-[#f9f9fb] !text-[#1c2024]': disabled,
            '!bg-[#ffff] !text-[#1c2024]': !disabled,
          },
          className,
        )}
      >
        {selectedValue || placeholder}
        {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
      {open && (
        <Box
          className={`absolute z-10 mt-2 w-full rounded-2 border !border-[#cdced6] bg-[#ffff] `}
        >
          <Box className="flex items-center gap-1 border-b !border-[#cdced6] px-1 py-1">
            <MagnifyingGlassIcon height="16" width="16" />
            <TextField.Root
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Search..."
              className={`w-full !border-[white] outline-none placeholder:text-1 focus:!border-[white] focus:!outline-none ${inputClass}`}
            />
          </Box>
          <ul className="flex max-h-60 flex-col items-start justify-start bg-[#ffff]">
            {results.length === 0 ? (
              <li className={`text-gray-500 px-4 py-2 text-1 ${liClass}`}>
                No results
              </li>
            ) : (
              results.slice(0, 7).map((item: any) => (
                <Button
                  type="button"
                  key={item[keyName]}
                  onClick={() => handleSelect(item)}
                  className={`cursor-pointer !bg-[#ffff] px-4 py-2 text-1 font-light !text-[#1c2024] ${liClass}`}
                >
                  {item[keyName]}
                </Button>
              ))
            )}
          </ul>
        </Box>
      )}
    </Box>
  )
}

export default memo(Dropdown)
