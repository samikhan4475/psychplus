'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Box,
  Flex,
  ScrollArea,
  Text,
  TextField,
  Tooltip,
} from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { LoadingPlaceholder } from '@/components'
import { SelectOptionType } from '@/types'
import { cn } from '@/utils'
import { getProviderOptionsAction } from '../actions'

interface DropdownMenuSearchProps {
  placeholder?: string
  onSelectItem: (selectedItem: SelectOptionType | null) => void
  defaultValue?: string
  disabled?: boolean
}

const ProvidersList = ({
  dataList,
  onSelectItem,
}: {
  dataList: SelectOptionType[]
  onSelectItem: (item: SelectOptionType) => void
}) => {
  return dataList.map((option: SelectOptionType) => (
    <Flex
      key={option.value}
      align="center"
      p="1"
      onClick={() => onSelectItem(option)}
      className={cn(
        `hover:bg-pp-bg-accent cursor-pointer rounded-2 opacity-100`,
      )}
    >
      <Tooltip content={<Text className="select-text"> {option.label}</Text>}>
        <Text className="line-clamp-2 w-[400px] text-[11px]">
          {option.label}
        </Text>
      </Tooltip>
    </Flex>
  ))
}

const SearchClaimProviders = ({
  placeholder,
  onSelectItem,
  defaultValue,
  disabled = false,
}: DropdownMenuSearchProps) => {
  const [providersDataList, setProvidersDataList] = useState<
    SelectOptionType[]
  >([])
  const [loadingProviders, setLoadingProviders] = useState(false)
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(defaultValue)
  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInputValue(defaultValue)
  }, [defaultValue])

  const handleSearchService = useDebouncedCallback(async (value: string) => {
    setLoadingProviders(true)

    if (value.length < 2) return
    setLoadingProviders(true)
    const response = await getProviderOptionsAction(value)
    if (response.state === 'success') {
      setProvidersDataList(response.data || [])
    } else {
      setProvidersDataList([])
      toast(response.error)
    }
    setLoadingProviders(false)
  }, 500)

  const ref = useOnclickOutside(() => setOpen(false))

  const handleSelectItem = (item: SelectOptionType) => {
    setInputValue(item.label)
    setOpen(false)
    onSelectItem(item)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value === '') {
      onSelectItem(null)
    } else {
      handleSearchService(value)
    }
  }
  const handleBlur = () => {
    if (!inputValue) {
      onSelectItem(null)
    }
  }
  const memoizedProviderList = useMemo(() => {
    if (loadingProviders) {
      return (
        <Flex height="100%" align="center" justify="center">
          <LoadingPlaceholder className="mt-3" />
        </Flex>
      )
    }
    if (!inputValue) {
      return <Text className=" text-1">Please type to search</Text>
    }
    if (providersDataList.length === 0) {
      return <Text className=" text-1">No data found</Text>
    }
    return (
      <ProvidersList
        dataList={providersDataList}
        onSelectItem={handleSelectItem}
      />
    )
  }, [providersDataList, loadingProviders])

  return (
    <Box ref={ref}>
      <Flex
        className={cn(
          'w-full flex-wrap overflow-y-auto rounded-2 border border-gray-7 ',
        )}
        align="center"
        gap="1"
        pl="1"
      >
        <TextField.Root
          tabIndex={-1}
          autoFocus={false}
          size="1"
          className="min-w-14 !outline-white w-[500px] flex-1 flex-row-reverse !text-1 [box-shadow:none]"
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          value={inputValue}
          disabled={disabled}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      {open && (
        <Box position="relative">
          <ScrollArea
            className={
              'bg-white !absolute z-50 mx-auto h-auto max-h-40 rounded-[25px] p-2 shadow-3'
            }
            style={{ width: inputRef.current?.clientWidth }}
          >
            {memoizedProviderList}
          </ScrollArea>
        </Box>
      )}
    </Box>
  )
}

export { SearchClaimProviders }
