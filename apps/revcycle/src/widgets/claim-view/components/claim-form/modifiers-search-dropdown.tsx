import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { getModifiersCodes } from '../../api.client'
import { ModifierCode } from '../../types'
import SearchDropdown from './search-dropdown'

const fetchModifierCodes = async (query: string) => {
  const res = await getModifiersCodes(query)
  return res.codes
}

const renderModifierItem = (modifier: ModifierCode) => {
  return (
    <Flex className="rounded-[8px] border-b border-gray-2 px-2 py-1">
      <Text className="flex-1">{modifier.code}</Text>
    </Flex>
  )
}
interface DropdownMenuSearchProps<T> {
  onSelectItem: (selectedItem: ModifierCode) => void
  modifierCode?: string
  placeholder?: string
}

const ModifiersSearchDropdown = <T extends ModifierCode>({
  onSelectItem,
  modifierCode,
  placeholder,
}: DropdownMenuSearchProps<T>) => {
  return (
    <SearchDropdown<ModifierCode>
      placeholder={placeholder}
      onSelectItem={onSelectItem}
      fetchResults={fetchModifierCodes}
      renderItem={renderModifierItem}
      searchQuery={modifierCode}
    />
  )
}

export { ModifiersSearchDropdown }
