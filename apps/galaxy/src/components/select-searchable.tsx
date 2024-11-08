'use client'

import { useState } from 'react'
import { Box, Flex, ScrollArea, Text, TextField } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useFormContext } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { BlockLabel, LoadingPlaceholder } from '@/components'
import { cn } from '@/utils'

interface DataItemProps {
  label: string
  value: string
}

interface ItemsListProps {
  onItemSelect: (item: DataItemProps) => void
  loading?: boolean
  data: DataItemProps[]
}

interface SelectSearchableProps {
  label?: string
  loading?: boolean
  data: DataItemProps[]
  field: string
  handleSearch: (value: string) => void
  defaultValue?: string
  required?: boolean
  handleItemSelect: (item: DataItemProps) => void
}

const ItemsList = ({ onItemSelect, loading, data }: ItemsListProps) => {
  if (loading) {
    return <LoadingPlaceholder className="mt-5" />
  }
  if (data.length === 0) {
    return (
      <Text weight="medium" className="text-[12px]">
        No data found
      </Text>
    )
  }

  return data.map((item: DataItemProps, index: number) => (
    <Flex
      key={item.value + index}
      align="center"
      p="1"
      onClick={() => onItemSelect(item)}
      className={cn(`hover:bg-pp-bg-accent cursor-pointer rounded-2`)}
    >
      <Text className="text-[11px]">{item.label}</Text>
    </Flex>
  ))
}

const SelectSearchable = ({
  label,
  defaultValue,
  loading,
  data,
  field,
  required= false,
  handleSearch,
  handleItemSelect,
}: SelectSearchableProps) => {
  const [showOptions, setShowOptions] = useState(false)
  const [searchValue, setSearchValue] = useState(defaultValue || '')

  const handleSearchInput = useDebouncedCallback((value: string) => {
    handleSearch(value)
  }, 500)

  const ref = useOnclickOutside(() => setShowOptions(false))
  const form = useFormContext()

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    handleSearchInput(e.target.value)
  }

  const onItemSelect = (item: DataItemProps) => {
    setShowOptions(false)
    setSearchValue(item.label)
    handleItemSelect(item)
    if (field) form.setValue(field, item.value)
  }

  return (
    <Flex align="center" gap="2">
      {label && (
        <BlockLabel required={required} name={field}>
          {label}
        </BlockLabel>
      )}
      <Box ref={ref} className="relative">
        <Flex className="overflow-y-auto rounded-2 border border-gray-7">
          <TextField.Root
            size="1"
            className="min-w-14 !outline-white h-5 flex-1 [box-shadow:none]"
            placeholder="Search Drugs"
            value={searchValue}
            onChange={onSearchChange}
            onFocus={() => setShowOptions(true)}
          />
        </Flex>

        {showOptions && (
          <ScrollArea
            className={cn(
              `bg-white !absolute z-50 mx-auto h-auto max-h-40 w-full rounded-[25px] p-2 shadow-3  ${
                loading ? 'min-h-28' : ''
              }`,
            )}
          >
            <ItemsList
              loading={loading}
              data={data}
              onItemSelect={onItemSelect}
            />
          </ScrollArea>
        )}
      </Box>
    </Flex>
  )
}

export { SelectSearchable }
