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
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <TabContentHeading title="Add Location">
        <StaffLocationFilter />
      </TabContentHeading>
      <StaffLocationTable />
      <StaffLocationListPagination />
    </Flex>
  )
}

export { StaffLocationView }
