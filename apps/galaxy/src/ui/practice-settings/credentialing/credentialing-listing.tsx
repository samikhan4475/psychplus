'use client'

import { Flex } from '@radix-ui/themes'
import { CredentialingListFilterForm } from './credentialing-list-filter-form'
import { CredentialingListTable } from './credentialing-list-table'

const CredentialingListing = () => {
  return (
    <Flex direction="column" className="bg-white p-1">
      <CredentialingListFilterForm />
      <CredentialingListTable />
    </Flex>
  )
}

export { CredentialingListing }
