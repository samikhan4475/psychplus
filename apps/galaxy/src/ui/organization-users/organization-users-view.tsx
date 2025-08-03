'use client'

import { useParams } from 'next/navigation'
import { Box, Flex } from '@radix-ui/themes'
import { useOrganizationMember } from '@/hooks'
import { OrganizationUserTable } from './organization-user-table'
import { OrganizationUsersListFilterForm } from './organization-users-list-filter-form'
import { UsersHeader } from './users-header'

const OrganizationUsersView = () => {
  const { id } = useParams<{ id: string }>()
  const isMember = useOrganizationMember(id ?? '')
  if (!isMember) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <h1>You are unauthorized to view this page</h1>
      </Flex>
    )
  }
  return (
    <Box className="w-full py-1">
      <UsersHeader />
      <OrganizationUsersListFilterForm />
      <OrganizationUserTable />
    </Box>
  )
}

export { OrganizationUsersView }
