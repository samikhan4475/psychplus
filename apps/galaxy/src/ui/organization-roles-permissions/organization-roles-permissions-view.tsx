'use client'

import { Box, Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { RoleDialog } from './dialogs'
import { OrganizationRolesListFilterForm } from './organization-roles-list-filter-form'
import { OrganizationRolesListTable } from './organization-staff-list-table'

const OrganizationRolesPermissionsView = () => {
  return (
    <Box className="w-full p-1">
      <Flex direction="column" className="gap-0.5" width="100%">
        <TabContentHeading title="Roles">
          <RoleDialog />
        </TabContentHeading>
        <OrganizationRolesListFilterForm />
        <Flex direction="column" className="bg-white w-full">
          <OrganizationRolesListTable />
        </Flex>
      </Flex>
    </Box>
  )
}

export { OrganizationRolesPermissionsView }
