'use client'

import { Box } from '@radix-ui/themes'
import { OrganizationStaffRoleHeading } from './organization-staff-roles-heading'
import { OrganizationStaffRolesTable } from './organization-staff-roles-list-table'

const OrganizationStaffRolesView = () => {
  return (
    <Box className="w-full py-1">
      <OrganizationStaffRoleHeading />
      <OrganizationStaffRolesTable />
    </Box>
  )
}

export { OrganizationStaffRolesView }
