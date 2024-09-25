import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { SearchButton } from '@/ui/schedule/calendar-view/search-button'
import { ClearButton } from './clear-button'
import { EndDate } from './end-date-filter'
import { FilterHeading } from './filter-heading'
import { FromDateFilter } from './from-date-filter'
import { FromDropdownFilter } from './from-dropdown-filter'
import { NameInputField } from './input-label'
import { StatusDropdownFilter } from './status-dropdown'

const ShowFilter = ({ showFilter }: { showFilter: boolean }) => {
  return (
    showFilter && (
      <Box>
        <FilterHeading />
        <Box px="2">
          <Flex gap="2" width="100%" mt="1">
            <FromDropdownFilter />
            <StatusDropdownFilter />
          </Flex>

          <Flex className="gap-[6px]" justify="between" width="100%" mt="2">
            <FromDateFilter />
            <EndDate />
          </Flex>
          <Flex
            width="100%"
            className="gap-[8px]"
            align="center"
            justify="between"
            mt="2"
          >
            <NameInputField />
            <ClearButton />
            <SearchButton />
          </Flex>
        </Box>
      </Box>
    )
  )
}

export { ShowFilter }
