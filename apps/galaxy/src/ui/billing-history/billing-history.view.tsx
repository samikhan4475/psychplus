'use client'

import { Flex } from '@radix-ui/themes'
import { BillingHeader } from './billing-header'
import { BillingTable } from './billing-table'
import { BillingFilterForm } from './filter-form'

interface BillingHistoryViewProps {
  patientId: string
}

const BillingHistoryView = ({ patientId }: BillingHistoryViewProps) => {
  return (
    <Flex direction="column" width="100%" gap="1">
      <BillingHeader>
        <BillingFilterForm />
      </BillingHeader>
      <BillingTable />
    </Flex>
  )
}

export { BillingHistoryView }
