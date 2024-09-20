import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { SearchButton } from '@/ui/schedule/calendar-view/search-button'
import {
  ClearButton,
  EndDate,
  FilterHeading,
  FromDateFilter,
  FromDropdownFilter,
  NameInputField,
  StatusDropdownFilter,
} from '.'

const ShowFilter = ({ showFilter }: { showFilter: boolean }) => {
  return (
    showFilter && (
      <Box>
        <FilterHeading />
        <Flex gap="2" width="100%" px="2" mt="1">
          <FromDropdownFilter />
          <StatusDropdownFilter />
        </Flex>
        <Flex gap="2" width="100%" px="2" mt="2">
          <FromDateFilter />
          <EndDate />
        </Flex>
        <Flex width="100%" gap="1" align="center" px="2" mt="2">
          <NameInputField />
          <ClearButton />
          <SearchButton />
        </Flex>
      </Box>
    )
  )
}

export { ShowFilter }
