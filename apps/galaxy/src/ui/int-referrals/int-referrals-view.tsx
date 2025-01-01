'use client'

import { Flex } from '@radix-ui/themes'
import { IntReferralsHeader } from './int-referrals-header'
import { IntReferralsTable } from './int-referrals-table'
import { IntReferralsTablePagination } from './int-referrals-table-pagination'
import { IntReferralsForm } from './int-patient-filter-form'
import { StoreProvider } from './store'

const IntReferralsView = () => {
  return (
    <StoreProvider>
      <Flex
        gap="1"
        className="bg-pp-bg-accent flex-1 !overflow-hidden"
        direction="column"
      >
        <IntReferralsHeader />
        <IntReferralsForm />
        <IntReferralsTable />
        <IntReferralsTablePagination />
      </Flex>
    </StoreProvider>
  )
}

export { IntReferralsView }
