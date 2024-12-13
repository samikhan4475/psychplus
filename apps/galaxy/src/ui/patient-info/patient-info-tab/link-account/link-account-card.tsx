'use client'

import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { LinkAccountTable } from '@/types'
import { AddAccountLink } from './dialog/add-account-link'
import { LinkAccountListingTable } from './link-account-table'

interface LinkAccountCardProps {
  lintAccounts: LinkAccountTable[]
  patientId: string
}

const LinkAccountCard = ({ lintAccounts, patientId }: LinkAccountCardProps) => {
  return (
    <Flex direction="column" className="bg-white overflow-hidden rounded-1">
      <CardHeading title="Link Account">
        <Flex justify="end" flexGrow="1">
          <AddAccountLink patientId={patientId} />
        </Flex>
      </CardHeading>
      <Flex direction="column" p="2" gap="2">
        <LinkAccountListingTable linkAccountListing={lintAccounts} />
      </Flex>
    </Flex>
  )
}

export { LinkAccountCard }
