'use client'

import { Box, Text } from "@radix-ui/themes"
import { UsersHeader } from "./users-header"
import { OrganizationUsersListFilterForm } from "./organization-users-list-filter-form"
import { OrganizationUserTable } from "./organization-user-table"

const OrganizationUsersView = () => {
  return (
    <Box className="w-full py-1">
      <UsersHeader />
      <OrganizationUsersListFilterForm  />
      <OrganizationUserTable  />
    </Box>
  )
}

export { OrganizationUsersView }