'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { AddStaffButton } from './add-staff-button'
import { StaffFilterForm } from './staff-filter-form'
import { StaffListTable } from './staff-list-table'
import { StaffListTablePagination } from './staff-list-table-pagination'

interface StaffManagementViewProps {
  googleApiKey: string
}

const StaffManagementView = ({ googleApiKey }: StaffManagementViewProps) => {
  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <TabContentHeading title="Staff">
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          <AddStaffButton />
        </GooglePlacesContextProvider>
      </TabContentHeading>
      <StaffFilterForm />
      <StaffListTable />
      <StaffListTablePagination />
    </Flex>
  )
}

export { StaffManagementView }
