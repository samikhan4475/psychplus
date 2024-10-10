'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { TabContentHeading } from '../shared'
import { AddCustomChargeDialog } from './add-custom-charge-dialog'
import { FilterForm } from './filter-form'
import { PaymentButton } from './payment-button'
import { PaymentHeader } from './payment-header'
import { PaymentHistoryTable } from './payment-history-table'
import { PaymentHistoryTablePagination } from './payment-history-table-pagination'
import { useStore } from './store'

const TAB_TITLE = 'Payment Hx'
interface PaymentHistoryTabProps {
  stripeApiKey: string
  patientId: string
  googleApiKey: string
}
const PaymentHistoryTab = ({
  stripeApiKey,
  patientId,
  googleApiKey,
}: PaymentHistoryTabProps) => {
  const { data, fetchPatientPaymentHistory } = useStore((state) => ({
    loading: state.loading,
    fetchPatientPaymentHistory: state.fetchPatientPaymentHistory,
    data: state.data?.paymentHistory,
  }))

  useEffect(() => {
    fetchPatientPaymentHistory({ patientIds: [patientId] })
  }, [fetchPatientPaymentHistory, patientId])

  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title={TAB_TITLE}>
        <Flex gap="2" align="center" className="flex-1" justify="end">
          <AddCustomChargeDialog />
          <PaymentButton
            stripeApiKey={stripeApiKey}
            patientId={patientId}
            googleApiKey={googleApiKey}
          />
        </Flex>
      </TabContentHeading>
      <ScrollArea>
        <PaymentHeader data={data} />
        <Flex direction="column" gap="1" className="bg-white w-full py-1">
          <FilterForm patientId={patientId} />
          <Flex direction="column" pl="2">
            <PaymentHistoryTable />
            <PaymentHistoryTablePagination />
          </Flex>
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export { PaymentHistoryTab }
