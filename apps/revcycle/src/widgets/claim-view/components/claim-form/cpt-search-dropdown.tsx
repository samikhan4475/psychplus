import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { getCPTCodes } from '../../api.client'
import { CPTCode } from '../../types'
import SearchDropdown from './search-dropdown'

const fetchCPTCodes = async (query: string) => {
  const res = await getCPTCodes(query)
  return res.codes
}

const renderCPTItem = (provider: CPTCode) => {
  return (
    <Flex className="rounded-[8px] border-b border-gray-2 px-2 py-1">
      <Text className="flex-1">{provider.code}</Text>
    </Flex>
  )
}

interface DropdownMenuSearchProps<T> {
  onSelectItem: (selectedItem: CPTCode) => void
  cptCode?: string
}

const CPTSearchDropdown = <T extends CPTCode>({
  onSelectItem,
  cptCode,
}: DropdownMenuSearchProps<T>) => {
  return (
    <SearchDropdown<CPTCode>
      placeholder="Search CPT Codes"
      onSelectItem={onSelectItem}
      fetchResults={fetchCPTCodes}
      renderItem={renderCPTItem}
      searchQuery={cptCode}
    />
  )
}

export { CPTSearchDropdown }
