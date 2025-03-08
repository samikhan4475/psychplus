'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { StaffLocationFilter } from './staff-location-filters'
import { StaffLocationListPagination } from './staff-location-list-pagination'
import { StaffLocationTable } from './staff-location-table'
import { TabContentHeading } from './tab-content-heading'

const StaffLocationView = () => {
  return (
    <Flex
      gap="1"
      className=" h-[calc(100dvh-155px)] flex-1 !overflow-hidden"
      direction="column"
    >
      <TabContentHeading title="Add Location">
        <StaffLocationFilter />
      </TabContentHeading>
      <Flex
        direction="column"
        className="bg-white flex-1 !overflow-hidden rounded-1 pt-2 shadow-2"
      >
        <StaffLocationTable />
        <StaffLocationListPagination />
      </Flex>
    </Flex>
  )
}

export { StaffLocationView }
