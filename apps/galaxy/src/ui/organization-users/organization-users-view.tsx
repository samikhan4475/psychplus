'use client'

import { Box } from "@radix-ui/themes"
import { OrganizationUserTable } from "./organization-user-table"
import { OrganizationUsersListFilterForm } from "./organization-users-list-filter-form"
import { UsersHeader } from "./users-header"

const OrganizationUsersView = () => {
  return (
    <Box className="w-full py-1">
      <UsersHeader />
      <OrganizationUsersListFilterForm />
      <OrganizationUserTable />
    </Box>
  )
}

export { OrganizationUsersView }
