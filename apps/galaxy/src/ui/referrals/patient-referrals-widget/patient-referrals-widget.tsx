'use client'

import { Flex } from '@radix-ui/themes'
import { ReferralsFilterForm } from './referrals-filter-form'
import { ReferralsHeader } from './referrals-header'
import { ReferralsTable } from './referrals-table'
import { ReferralsTablePagination } from './referrals-table-pagination'
import { StoreProvider } from './store'

interface PatientReferralsWidgetProps {
  patientId: string
}

const PatientReferralsWidget = ({ patientId }: PatientReferralsWidgetProps) => {
  return (
    <StoreProvider patientId={patientId}>
      <Flex
        direction="column"
        width="100%"
        className="bg-white h-[calc(100dvh_-_278px)] rounded-1 shadow-2"
      >
        <Flex gap="1" direction="column" mb="1">
          <ReferralsHeader patientId={patientId} />
          <ReferralsFilterForm />
        </Flex>
        <ReferralsTable />
        <ReferralsTablePagination />
      </Flex>
    </StoreProvider>
  )
}

export { PatientReferralsWidget }
