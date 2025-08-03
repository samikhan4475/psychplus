'use client'

import { useParams } from 'next/navigation'
import { Box, Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { useOrganizationMember } from '@/hooks'
import { RoleDialog } from './dialogs'
import { OrganizationRolesListFilterForm } from './organization-roles-list-filter-form'
import { OrganizationRolesListTable } from './organization-staff-list-table'

const OrganizationRolesPermissionsView = () => {
  const { id } = useParams<{ id: string }>()
  const isMember = useOrganizationMember(id || '')
  if (!isMember) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <h1>You are unauthorized to view this page</h1>
      </Flex>
    )
  }
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
