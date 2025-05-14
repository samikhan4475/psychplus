'use client'

import { Flex } from '@radix-ui/themes'
import { ExternalReferralFilterForm } from './external-referral-filter-form'
import { ExternalReferralHeader } from './external-referral-header'
import { ExternalReferralTable } from './external-referral-table'
import { ExternalReferralTablePagination } from './external-referral-table-pagination'

const ExternalReferralView = () => {
  //TODO: There are some filters and columns which are non-functional, will be functional in the phase 2
  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <ExternalReferralHeader />
      <ExternalReferralFilterForm />
      <Flex direction="column" className="bg-white flex-1 !overflow-hidden">
        <ExternalReferralTable />
        <ExternalReferralTablePagination />
      </Flex>
    </Flex>
  )
}

export { ExternalReferralView }
