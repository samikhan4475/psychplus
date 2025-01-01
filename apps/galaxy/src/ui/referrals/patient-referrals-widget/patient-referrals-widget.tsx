'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { ReferralsFilterForm } from './referrals-filter-form'
import { ReferralsHeader } from './referrals-header'
import { ReferralsTable } from './referrals-table'
import { ReferralsTablePagination } from './referrals-table-pagination'
import { StoreProvider } from './store'

interface PatientReferralsWidgetProps {
  patientId: string
  isTabView?: boolean
  hideHeader?: boolean
}

const PatientReferralsWidget = ({
  patientId,
  isTabView,
  hideHeader,
}: PatientReferralsWidgetProps) => {
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id') ?? ''

  return (
    <StoreProvider
      patientId={patientId}
      isTabView={isTabView}
      appointmentId={appointmentId}
    >
      <Flex
        direction="column"
        width="100%"
        className="bg-white max-h-[calc(100dvh_-_300px)] rounded-1 shadow-2"
      >
        <Flex gap="1" direction="column" mb="1">
          {!hideHeader && (
            <ReferralsHeader
              patientId={patientId}
              appointmentId={appointmentId}
            />
          )}
          {isTabView && <ReferralsFilterForm />}
        </Flex>
        <ReferralsTable isTabView={isTabView} />
        <ReferralsTablePagination />
      </Flex>
    </StoreProvider>
  )
}

export { PatientReferralsWidget }
