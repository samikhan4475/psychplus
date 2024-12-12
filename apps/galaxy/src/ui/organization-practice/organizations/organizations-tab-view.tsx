'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { OrganizationDialog } from '../dialogs'
import { OrganizationsListFilterForm } from './organizations-list-filter-form'
import { OrganizationsListTable } from './organizations-list-table'
import { OrganizationsListTablePagination } from './organizations-list-table-pagination'

const OrganizationsTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5" width="100%">
      <TabContentHeading title="Organizations">
        <OrganizationDialog />
      </TabContentHeading>
      <OrganizationsListFilterForm />
      <Flex direction="column" className="bg-white w-full">
        <OrganizationsListTable />
        <OrganizationsListTablePagination />
      </Flex>
    </Flex>
  )
}

export { OrganizationsTabView }
