'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { formatValueWithDecimals } from '@/utils'
import { TabContentHeading } from '../shared'
import { AddCustomChargeButton } from './add-custom-charge-button'
import { AddCustomChargeDialog } from './add-custom-charge-dialog'
import { FilterForm } from './filter-form'
import { PaymentButton } from './payment-button'
import { PaymentDialog } from './payment-dialog'
import { PaymentHeader } from './payment-header'
import { PaymentHistoryTable } from './payment-history-table'
import { PaymentHistoryTablePagination } from './payment-history-table-pagination'
import { useStore } from './store'

const TAB_TITLE = 'Payment Hx'
interface PaymentHistoryTabProps {
  patientId: string
}
const PaymentHistoryTab = ({ patientId }: PaymentHistoryTabProps) => {
  const { data, fetchPatientPaymentHistory, refetch } = useStore((state) => ({
    loading: state.loading,
    fetchPatientPaymentHistory: state.fetchPatientPaymentHistory,
    data: state.data?.paymentHistory,
    refetch: state.refetch,
  }))

  useEffect(() => {
    fetchPatientPaymentHistory({ patientIds: [patientId] })
  }, [fetchPatientPaymentHistory, patientId])

  const handleCloseDialog = () => {
    refetch()
  }

  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title={TAB_TITLE}>
        <Flex gap="2" align="center" className="flex-1" justify="end">
          <AddCustomChargeDialog
            patientId={patientId}
            onClose={handleCloseDialog}
            unappliedAmount={formatValueWithDecimals(data?.unappliedPayment)}
          >
            <AddCustomChargeButton />
          </AddCustomChargeDialog>
          <PaymentDialog patientId={patientId} onClose={handleCloseDialog}>
            <PaymentButton />
          </PaymentDialog>
        </Flex>
      </TabContentHeading>
      <ScrollArea>
        <PaymentHeader data={data} patientId={patientId} />
        <Flex direction="column" gap="1" className="bg-white w-full py-1">
          <FilterForm patientId={patientId} />
          <Flex direction="column" pl="2" className="h-[calc(100dvh_-_390px)]">
            <PaymentHistoryTable />
            <PaymentHistoryTablePagination />
          </Flex>
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export { PaymentHistoryTab }
