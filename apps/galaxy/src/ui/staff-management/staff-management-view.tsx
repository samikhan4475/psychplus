import React from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { AddStaffButton } from './add-staff-button'
import { StaffFilterForm } from './staff-filter-form'
import { StaffListTable } from './staff-list-table'
import { StaffListTablePagination } from './staff-list-table-pagination'

const StaffManagementView = () => {
  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <TabContentHeading title="Staff">
        <AddStaffButton />
      </TabContentHeading>
      <StaffFilterForm />
      <StaffListTable />
      <StaffListTablePagination />
    </Flex>
  )
}

export { StaffManagementView }
