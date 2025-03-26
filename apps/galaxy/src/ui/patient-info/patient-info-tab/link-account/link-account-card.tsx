'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { LinkAccountTable, PatientLink } from '@/types'
import { getPatientLinksAction } from './actions/get-link-patients'
import { AddAccountLink } from './dialog/add-account-link'
import { LinkAccountListingTable } from './link-account-table'

interface LinkAccountCardProps {
  lintAccounts: LinkAccountTable[]
  patientId: string
}

const LinkAccountCard = ({ lintAccounts, patientId }: LinkAccountCardProps) => {
  const [patientLinkAccounts, setPatientLinkAccounts] = useState<PatientLink[]>(
    [],
  )
  const handlepatientlintks = async () => {
    const result = await getPatientLinksAction(patientId)
    if (result.state === 'success') {
      const filterActiveItems = result?.data.filter(
        (item) => item.recordStatus !== 'Inactive',
      )
      setPatientLinkAccounts(filterActiveItems)
    }
  }
  useEffect(() => {
    handlepatientlintks()
  }, [patientId])

  const onCloseModalTrigger = () => {
    handlepatientlintks()
  }
  return (
    <Flex direction="column" className="bg-white overflow-hidden rounded-1">
      <CardHeading title="Link Account">
        <Flex justify="end" flexGrow="1">
          <AddAccountLink
            patientId={patientId}
            onCloseModal={onCloseModalTrigger}
          />
        </Flex>
      </CardHeading>
      <Flex direction="column" p="2" gap="2">
        <LinkAccountListingTable
          linkAccountListing={patientLinkAccounts}
          refetchList={handlepatientlintks}
        />
      </Flex>
    </Flex>
  )
}

export { LinkAccountCard }
