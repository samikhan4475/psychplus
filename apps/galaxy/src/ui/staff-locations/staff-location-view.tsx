'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { useStore as useGlobalStore } from '@/store'
import { StaffLocationFilter } from './staff-location-filters'
import { StaffLocationListPagination } from './staff-location-list-pagination'
import { StaffLocationTable } from './staff-location-table'
import { TabContentHeading } from './tab-content-heading'

const StaffLocationView = ({ isProfileView }: { isProfileView?: boolean }) => {
  const { user } = useGlobalStore((state) => ({ user: state.user }))
  const params = useParams<{ id: string }>()
  const staffId = isProfileView ? `${user?.staffId}` : params.id

  return (
    <Flex
      gap="1"
      className=" h-[calc(100dvh-155px)] flex-1 !overflow-hidden"
      direction="column"
    >
      <TabContentHeading title="Add Location">
        <StaffLocationFilter staffId={staffId} />
      </TabContentHeading>
      <Flex
        direction="column"
        className="bg-white flex-1 !overflow-hidden rounded-1 pt-2 shadow-2"
      >
        <StaffLocationTable staffId={staffId} />
        <StaffLocationListPagination />
      </Flex>
    </Flex>
  )
}

export { StaffLocationView }
